'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async updateForMobileApp(ctx) {
		const userFromContext = ctx.state.user; 
		const body = ctx.request.body;

		const content = await strapi.services['content'].findOne({ title: body.title });
		if (!content) {
			return ctx.badRequest(null, 'Content [' + body.title + '] does not exist');
		}

		let thematiqueMobile = await strapi.services['thematique-mobile'].findOne({title: body.theme_app})
		if (!thematiqueMobile) {
			thematiqueMobile = await strapi.services['thematique-mobile'].create({
				title: body.theme_app
			})
		}

		let level = {}
		if (body.level) {
			level = await strapi.services['niveau'].findOne({value: parseInt(body.level)})
			if (!level) {
				level = await strapi.services['niveau'].create({
					value: parseInt(body.level),
					name: 'Niveau ' + body.level
				})
			}
		}


		let updatedContent = {
			title_mobile: content.title,
			thematique_mobile: thematiqueMobile.id,
			niveau: level.id
		}

		if (body.new_title) {
			updatedContent.title_mobile = body.new_title
		}

		const entity = await strapi.services['content'].update({id: content.id}, updatedContent)

		return sanitizeEntity(entity, { model: strapi.models.content });
	}
};
