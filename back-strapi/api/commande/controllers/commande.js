'use strict';

const _ = require('lodash');
const fs = require('fs');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;

    // CHECK AVAILABILITY & DECREMENT STOCK
    if (ctx.request.body.content[0].__component === 'commandes.box-sur-mesure') {
      const products_box = ctx.request.body.content[0].produits 
      const available = await strapi.services['box-sur-mesure'].checkDynamicBoxAvailability(products_box)

      if (available) {
        products_box.forEach((product_wrapper) => {
          strapi.services["box-sur-mesure"].decrement(product_wrapper.produit, product_wrapper.quantity)
        })
      } else {
        return ctx.badRequest(null, 'Some products unavailable');
      }
    } else if (ctx.request.body.content[0].__component === 'commandes.box') {
      const box_id = ctx.request.body.content[0].box
      const available = await strapi.services.box.checkBoxAvailability(box_id)
      
      if (available) {
        strapi.services["box"].decrement(box_id, 1)
      } else {
        return ctx.badRequest(null, 'Box ' + box_id + ' unavailable');
      }
    }

    let tmp_order = ctx.request.body

    // FILL NAME
    if (tmp_order.poi_name) {
      tmp_order.name = tmp_order.poi_name
    } else {
      tmp_order.name = tmp_order.first_name + ' ' + tmp_order.last_name
    }

    //SAVE ORDER
    entity = await strapi.services.commande.create(tmp_order);

    // SEND CONFIRMATION EMAIL TO USER
    if (ctx.request.body.content[0].__component === 'commandes.box' && ctx.request.body.email && !ctx.request.body.no_email) {
      strapi.log.info('SENDING EMAIL TO : ', entity.email, ' - ORDER NUMBER ', entity.id)

      const box_id = ctx.request.body.content[0].box
      const box = await strapi.services.box.findOne({id: box_id})

      const email_txt = await fs.promises.readFile('emails/order_confirmation.txt', 'utf8')
      const email_html = await fs.promises.readFile('emails/order_confirmation.html', 'utf8')

      const EMAIL_ORDER_CONFIRM = {
        subject: 'Commande effectuée ✔',
        text: email_txt,
        html: email_html,
      }

      await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: entity.email
        },
        EMAIL_ORDER_CONFIRM,
        {
          order: Object.assign(
            _.pick(entity, ['name', 'first_name', 'last_name', 'id', 'address', 'address_zipcode', 'address_city']),
            {
              delivery_name: entity.delivery === 'pickup' ? 'En point relais' : 'À domicile',
              box: _.pick(box, ['title'])
            }
          )
        }
      )
    }    

    return entity;
  }
};
