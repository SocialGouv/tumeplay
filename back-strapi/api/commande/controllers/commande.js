'use strict';


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
      entity = await strapi.services.commande.create(ctx.request.body);
    if (ctx.request.body.content[0].__component === 'commandes.box-sur-mesure') {
      ctx.request.body.content[0].produits.forEach((product_wrapper) => {
        strapi.services["box-sur-mesure"].decrement(product_wrapper.produit, product_wrapper.quantity)
      })
    }
    return entity;
  },

};
