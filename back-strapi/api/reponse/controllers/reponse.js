'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    async create(ctx) {
        let entity;

        const similars = await strapi.services.reponse.find({user_id: ctx.request.body.user_id, question: ctx.request.body.question, _sort: 'created_at:desc'})

        if (similars.length > 0) {
            const lastResponse = similars[0]
            ctx.request.body.quizz_iteration = lastResponse.quizz_iteration + 1
        }

        entity = await strapi.services.reponse.create(ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.models.reponse });
    }
};
