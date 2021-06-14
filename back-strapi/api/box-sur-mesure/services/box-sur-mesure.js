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
  },
  async checkDynamicBoxAvailability(products_box) {
    const bsm = await strapi.services['box-sur-mesure'].find()

    let available = true;
    bsm.produits.forEach(product_stock => {
      const product = products_box.find((_) => _.produit === product_stock.produit.id)
      if (product && available) {
        available = (product_stock.stock - product.quantity) >= 0
      }
    })

    return available;
  }
};
