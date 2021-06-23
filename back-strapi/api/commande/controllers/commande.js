'use strict';

const EMAILING = {
  newOrder : {
    subject: 'Nouvelle commande effectuée ✔',
    text: 'Hello world!',
    html: 'Hello world!',
  }
}


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
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

        // await strapi.plugins['email'].services.email.send(
        //   Object.assign(EMAILING.newOrder, {
        //     to: 'clement@numericite.eu'
        //   })
        // );

      } else {
        return ctx.badRequest(null, 'Box ' + box_id + ' unavailable');
      }
    }

    let tmpOrder = ctx.request.body

    if (tmpOrder.poi_name) {
      tmpOrder.name = tmpOrder.poi_name
    } else {
      tmpOrder.name = tmpOrder.first_name + ' ' + tmpOrder.last_name
    }


    let entity = await strapi.services.commande.create(tmpOrder);

    return entity;
  }
};
