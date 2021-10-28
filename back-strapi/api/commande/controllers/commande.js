'use strict';

const _ = require('lodash');
const http = require('http');
const fs = require('fs');
const soap = require('soap');
const path = require('path');
const md5 = require('md5');
const mondialRelayUrl = 'http://api.mondialrelay.com/Web_Services.asmx?WSDL';
const PDFMerger = require('pdf-merger-js');
const axios = require("axios")
const html_to_pdf = require('html-pdf-node');
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const buildSearchPoiParams = (latitude, longitude) => {
  let searchPoiParams = {
      Enseigne: strapi.config.get('server.mondialRelay.id'),
      Pays: 'FR',
      Ville: '',
      CP: '',
      Latitude: latitude,
      Longitude: longitude,
      Taille: '',
      Poids: '',
      Action: '',
      DelaiEnvoi: '0',
      RayonRecherche: '40',
  };

  let securityKey = '';
  for (const prop in searchPoiParams) {
      securityKey += searchPoiParams[prop];
  }

  securityKey += strapi.config.get('server.mondialRelay.secret');

  const hash = md5(securityKey);

  searchPoiParams.Security = hash.toUpperCase();

  return searchPoiParams;
}

const buildMrParams = (order) => {
  const orderMrParams = {
    mode: '24R',
    poi_name: order.poi_name,
    poi_number: order.poi_number,
    street: order.address,
    city: order.address_city,
    zipCode: order.address_zipcode,
    fullName: order.first_name + ' ' + order.last_name,
    email: order.email,
  }

  const mrParams = {
    Enseigne: strapi.config.get('server.mondialRelay.id'),
    ModeCol: 'REL',
    ModeLiv: orderMrParams.mode,

    Expe_Langage: 'FR',
    Expe_Ad1: 'M. TUMEPLAY',
    Expe_Ad3: '106 Boulevard Richard-Lenoir',
    Expe_Ville: 'Paris',
    Expe_CP: '75011',
    Expe_Pays: 'FR',
    Expe_Tel1: '+33142386040',

    Dest_Langage: 'FR',
    Dest_Ad1: 'M. ' + orderMrParams.fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-', ' ').toUpperCase(),
    Dest_Ad3: orderMrParams.poi_name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-', ' ').toUpperCase(),
    Dest_Ad4: orderMrParams.street.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-', ' ').toUpperCase(),
    Dest_Ville: orderMrParams.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('-', ' ').toUpperCase(),
    Dest_CP: orderMrParams.zipCode,
    Dest_Pays: 'FR',
    Dest_Mail: orderMrParams.email,

    Poids: '400',
    NbColis: '1',

    CRT_Valeur: '0',
    COL_Rel_Pays: 'FR',
    COL_Rel: '003490',
    LIV_Rel_Pays: 'FR',
    LIV_Rel: orderMrParams.poi_number,
    Texte: ' '
  }

  let securityKey = '';
  for (const prop in mrParams)
  {
    if( prop != 'Texte' )
    {
      securityKey += mrParams[prop];
    }
  }

  securityKey += strapi.config.get('server.mondialRelay.secret');

  const hash = md5(securityKey);

  mrParams.Security = hash.toUpperCase();

  return mrParams
}

const colissimoTmpPdf = async (orders, promises) => {
  let remainingOrders;
  let count;
  if (orders.length > 0) {
    let first16orders = orders.slice(0, 16)
    remainingOrders = orders.slice(16, orders.length)
    const dirPath = 'uploads/orders/colissimo/tmp'
    const relativeDirPath = path.relative('.', `public/${dirPath}`)
    const filename = 'colissimo_' + new Date().getTime() + '.pdf';
    await fs.mkdirSync(relativeDirPath, { recursive: true })
    const options = {
      format: 'A4',
      path: relativeDirPath + '/' + filename,
      margin: {
        top: "25px",
        bottom: "25px",
      }
    };
    const skeletonStyle = "display: grid; grid-template-columns: repeat(2, 1fr); margin-left: 0px; margin-right: 0px;"
    const gridItemStyle='color:black; text-align: left; border: solid 1px #dadada; height: 129px; padding-left: 10px; padding-right: 10px;'
    let gridItems = ""
    first16orders.forEach((order, index) => {
      gridItems = gridItems + (`
                          <div style="${gridItemStyle}">
                            <span style="display: block; padding-top: 10px;">${order.name.toUpperCase()}</span>
                            <span>${order.address.toUpperCase()}${order.address_more !== null ? ', ' + order.address_more.toUpperCase() : ''}</span><br><br>
														<span>${order.address_zipcode} ${order.address_city && order.address_city.toUpperCase()}</span><br>
                            <span>${order.phone}</span>
                         </div>
                         `)

      return(gridItems)
    })
    const skeleton = `<div style="${skeletonStyle}">
                  ${gridItems}
                </div>`

    const file = {
      content: skeleton
    }
    promises.push(
			new Promise((resolve) => {
				html_to_pdf.generatePdf(file, options).then(() => {
					resolve();
				})
			})
		)
  };
  if(remainingOrders.length > 0) {
    colissimoTmpPdf(remainingOrders, promises)
  }

	return Promise.all(promises)
}

module.exports = {
  async create(ctx) {
    let entity;
    let tmp_order = ctx.request.body

    // CHECK AVAILABILITY & DECREMENT STOCK
    if (ctx.request.body.content[0].__component === 'commandes.box-sur-mesure') {
      const products_box = ctx.request.body.content[0].produits
      const available = await strapi.services['box-sur-mesure'].checkDynamicBoxAvailability(products_box)

      if (available) {
        products_box.forEach((product_wrapper) => {
          strapi.services["box-sur-mesure"].decrement(product_wrapper.produit, product_wrapper.quantity)
        })
      } else {
        return ctx.conflict(null, 'Some products unavailable');
      }
      const environnement = await strapi.services.environnement.findOne({'slug': 'guyane'})
      tmp_order.environnement = environnement.id
    } else if (ctx.request.body.content[0].__component === 'commandes.box') {
      const box_id = ctx.request.body.content[0].box
      const available = await strapi.services.box.checkBoxAvailability(box_id)

      if (available) {
        strapi.services["box"].decrement(box_id, 1)
      } else {
        return ctx.conflict(null, 'Box ' + box_id + ' unavailable');
      }
      const box = await strapi.services.box.findOne({'id': box_id})
      tmp_order.box_number = box.number
      tmp_order.environnement = box.environnement
    }

    //GENERATE LABEL IF MONDIAL RELAY
    let mondial_relay_pdf_url;
    if (tmp_order.delivery === 'pickup') {
      tmp_order.name = tmp_order.poi_name
			if (!ctx.request.body.no_email) {
				const soapClient = await soap.createClientAsync(mondialRelayUrl);
				const mrParams = buildMrParams(tmp_order)

      	const response = await soapClient.WSI2_CreationEtiquetteAsync(mrParams)
				const response_item = response[0]

				if (response_item && response_item.WSI2_CreationEtiquetteResult) {
					const mrResult = response_item.WSI2_CreationEtiquetteResult;

					if (mrResult.STAT === "0") {
						mondial_relay_pdf_url = "http://www.mondialrelay.com" + mrResult.URL_Etiquette.replace('format=A4', 'format=10x15');
					} else {
						return ctx.methodNotAllowed(null, 'Error ' + mrResult.STAT + ' while create remote label')
					}
				} else {
					return ctx.internal(null, 'Error while calling mondial relay SOAP service')
				}
			}
    } else if (tmp_order.delivery === 'home') {
      tmp_order.name = tmp_order.first_name + ' ' + tmp_order.last_name
    } else if (tmp_order.delivery === 'referent') {
      tmp_order.name = tmp_order.poi_name
    }

    //SAVE ORDER
    entity = await strapi.services.commande.create(tmp_order);

    //SAVE LABEL IF MONDIAL RELAY
    if (mondial_relay_pdf_url) {
      const dirpath = 'public/uploads/orders/mondial-relay/'
      await fs.mkdirSync(dirpath, { recursive: true })

      const filename = dirpath + 'order_mondial_relay_' + entity.id + '.pdf'
      const file = fs.createWriteStream(filename);
      http.get(mondial_relay_pdf_url, function(response) {
        response.pipe(file);
        strapi.log.info('MONDIAL RELAY PDF CREATED ' + filename)
      });
    }

    // SEND CONFIRMATION EMAIL TO USER
    if (!ctx.request.body.no_email) {
      strapi.log.info('SENDING EMAIL TO : ', entity.email, ' - ORDER NUMBER ', entity.id)
      let box;
      let referent;
      const referentID = ctx.request.body.referent
      const users =  await strapi.plugins['users-permissions'].services.user.fetchAll({referent: referentID})
      const users_email = users.map((user) => user.email)

      if(ctx.request.body.content[0].__component === 'commandes.box') {
        const box_id = ctx.request.body.content[0].box
        box = await strapi.services.box.findOne({id: box_id})
        referent = await strapi.services.referent.findOne({id: referentID})
      } else if (ctx.request.body.content[0].__component === 'commandes.box-sur-mesure') {
        referent = await strapi.services.referent.findOne({id: referentID})
        box = await strapi.services['box-sur-mesure'].find()
      }

      const order_email_txt = await fs.promises.readFile('emails/order_confirmation.txt', 'utf8')
      const order_email_html = await fs.promises.readFile('emails/order_confirmation.html', 'utf8')

      const EMAIL_ORDER_CONFIRM = {
        subject: 'Commande effectuée ✔',
        text: order_email_txt,
        html: order_email_html,
      }

      let delivery_name = '';
      let custom_text = '';

      switch(entity.delivery) {
        case 'pickup':
          delivery_name = 'En point relais'
          custom_text = 'Nos équipes la préparent et font le maximum pour l’expédier au plus vite. Le n° de suivi de ton colis te sera communiqué par e-mail.'
          break;
        case 'home':
          delivery_name = 'À domicile'
          break;
        case 'referent':
          delivery_name = 'Chez un référent'
          custom_text = 'Tu pourras récupérer ta boîte dans 5 jours au lieu de rencontre choisi, auprès du référent que tu as choisi.'
          break;
      }

      if (entity.delivery !== "referent") {
        if(ctx.request.body.email) {
          await strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
              to: entity.email
            },
            EMAIL_ORDER_CONFIRM,
            {
              order: Object.assign(
                _.pick(entity, ['name', 'first_name', 'last_name', 'id', 'address', 'address_zipcode', 'address_city']),
                {
                  delivery_name: delivery_name,
                  custom_text: custom_text,
                  box: _.pick(box, ['title']),
                }
              )
            }
          )
        }
      } else {
        const referent_text = await fs.promises.readFile('emails/referent_confirmation.txt', 'utf8');
        const referent_html = await fs.promises.readFile('emails/referent_confirmation.html', 'utf8');
        const order_email_ref_txt = await fs.promises.readFile('emails/order_confirmation_ref.txt', 'utf8')
        const order_email_ref_html = await fs.promises.readFile('emails/order_confirmation_ref.html', 'utf8')


        const REFERENT_ORDER_CONFIRM = {
          subject: "Une nouvelle commande Tumeplay",
          text: referent_text,
          html: referent_html
        };

        const EMAIL_ORDER_CONFIRM_REF = {
            subject: 'Commande effectuée ✔',
            text: order_email_ref_txt,
            html: order_email_ref_html,
        }
        if(ctx.request.body.email) {
          await strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
              to: entity.email
            },
            EMAIL_ORDER_CONFIRM_REF,
            {
              order: Object.assign(
                _.pick(entity, ['name', 'first_name', 'last_name', 'id', 'address', 'address_zipcode', 'address_city']),
                {
                  delivery_name: delivery_name,
                  custom_text: custom_text,
                  box: _.pick(box, ['title']),
                }
              ),
              referent: Object.assign(
                _.pick(referent, ['openingHours'])
              )
            }
          )
        }
        if(users_email.length > 0) {
          await strapi.plugins['email'].services.email.sendTemplatedEmail(
            {
              to: users_email.join(',')
            },
            REFERENT_ORDER_CONFIRM,
            {
              order: Object.assign(
                _.pick(entity, ['name', 'first_name', 'last_name', 'id', 'address', 'address_zipcode', 'address_city']),
                {
                  delivery_name: delivery_name,
                  box: _.pick(box, ['title'])
                }
              )
            }
          )
        }
      }
    }
    return entity;
  },
  async searchPOI(ctx) {
    const { latitude, longitude } = ctx.params
    const searchPoiParams = buildSearchPoiParams(latitude, longitude)

    const soapClient = await soap.createClientAsync(mondialRelayUrl);

    const response = await soapClient.WSI3_PointRelais_RechercheAsync(searchPoiParams);
    const response_item = response[0]

    if (response_item && response_item.WSI3_PointRelais_RechercheResult) {
        const mrResults = response_item.WSI3_PointRelais_RechercheResult;

        if (mrResults.STAT == 0) {
          return _.get(mrResults, 'PointsRelais.PointRelais_Details', [])
        }
    }

    return ctx.badRequest(null, 'Error while trying to fetch mondial relais API');
  },
  async generateMergePDF(ctx) {
    const ids = ctx.request.body.ids
    const merger = new PDFMerger();
    ids.forEach(async (id) =>
      merger.add(path.relative('.', `public/uploads/orders/mondial-relay/order_mondial_relay_${id}.pdf`))
    )
    const merge_pdf_path = 'uploads/orders/mondial-relay/merged_' + new Date().getTime() + '.pdf'
    const merge_pdf_save_path = path.relative('.', `public/${merge_pdf_path}`);
    await merger.save(merge_pdf_save_path);
    return process.env.DOMAIN_API + merge_pdf_path;
  },
  async createColissimo(ctx) {
    const dirPath = 'uploads/orders/colissimo/tmp'
    const relativeDirPath = path.relative('.', `public/${dirPath}`)

		if (fs.existsSync(relativeDirPath)) {
			await fs.rmdirSync(relativeDirPath, { recursive: true });
		}

    const ids = ctx.request.body.ids;
    let orders = await strapi.query('commande').find({id_in: ids})
    const merger = new PDFMerger();
    const merge_pdf_path = 'uploads/orders/colissimo/merged_colissimo_' + new Date().getTime() + '.pdf';
    await new Promise((resolve) => {
      colissimoTmpPdf(orders, []).then(async () => {
        fs.readdir(relativeDirPath, async (err, files) => {
          files.forEach(file => {
            merger.add(path.relative('.', `public/uploads/orders/colissimo/tmp/${file}`))
          })
          const merge_pdf_save_path = path.relative('.', `public/${merge_pdf_path}`);
          await merger.save(merge_pdf_save_path);
          resolve();
        })
      })
    })
    return process.env.DOMAIN_API + merge_pdf_path
  },
  async bulkUpdate(ctx) {
    const body = ctx.request.body
    let entities = await Promise.all(
      body.orders.map(order => {
        strapi.services.commande.update({ id: order.id }, order )
      })
    );
    return body.orders.map(o => o.id)
  }
};
