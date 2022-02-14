"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

const filter = async (arr, callback) => {
  const fail = Symbol();
  return (
    await Promise.all(
      arr.map(async (item) => ((await callback(item)) ? item : fail))
    )
  ).filter((i) => i !== fail);
};

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;

    const { level } = ctx.query;
    delete ctx.query.level;

    if (ctx.query._q) {
      entities = await strapi.services["thematique-mobile"].search(ctx.query);
    } else {
      entities = await strapi.services["thematique-mobile"].find(ctx.query);
    }

    if (level) {
      entities = await filter(entities, async (entity) => {
        const countQuestions = await strapi.services["content"].count({
          thematique_mobile: entity.id,
          "niveau.value_lte": level,
        });
        return countQuestions > 0;
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["thematique-mobile"] })
    );
  },
};
