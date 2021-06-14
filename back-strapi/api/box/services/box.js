'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

 module.exports = {
  async decrement(box_id, quantity) {
    await strapi.query('box').model.query((qb) => {
      qb.where('id', box_id);
      qb.increment('stock', - quantity);
    }).fetch();
  },
  async checkBoxAvailability(box_id) {
    const box = await strapi.services.box.findOne({ id: box_id })
    return box && box.stock > 0;
  },
};