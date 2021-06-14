'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async decrement(product_id, quantity) {
    await strapi.query('stocks.box-produit-sur-mesure').model.query((qb) => {
      qb.where('produit', product_id);
      qb.increment('stock', - quantity);
    }).fetch();
  }
};
