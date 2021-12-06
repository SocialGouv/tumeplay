"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const questionsModuleToArray = (questions) => {
  let questionsArray = [];

  var indexes = new Array(10).fill(0);

  indexes.forEach((osef, index) => {
    if (questions["question_" + (index + 1)]) {
      questionsArray.push(questions["question_" + (index + 1)]);
    }
  });

  return questionsArray;
};

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.module.search(ctx.query);
    } else {
      entities = await strapi.services.module.find(ctx.query);
    }

    entities = entities.map((entity) => {
      entity.questionsArray = questionsModuleToArray(entity.questions);
      return entity;
    });

    return entities;
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    let entity = await strapi.services.module.findOne({ id });

    entity.questionsArray = questionsModuleToArray(entity.questions);

    return entity;
  },
};
