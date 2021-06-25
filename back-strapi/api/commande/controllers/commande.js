'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;

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

    if (tmp_order.poi_name) {
      tmp_order.name = tmp_order.poi_name
    } else {
      tmp_order.name = tmp_order.first_name + ' ' + tmp_order.last_name
    }

    entity = await strapi.services.commande.create(tmp_order);

    return entity;
  }
};
