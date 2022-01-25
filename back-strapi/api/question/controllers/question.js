'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async updateForMobileApp(ctx) {
		const userFromContext = ctx.state.user; 
		const body = ctx.request.body;

		const question = await strapi.services['question'].findOne({ title: body.title });
		if (!content) {
			return ctx.badRequest(null, 'Question [' + body.title + '] does not exist');
		}

		let updatedContent = {
			title_mobile: question.title,
			kind: question.kind,
			
		}

		// if (body.new_title) {
		// 	updatedContent.title_mobile = body.new_title
		// }

		// const entity = await strapi.services['content'].update({id: content.id}, updatedContent)

		// return sanitizeEntity(entity, { model: strapi.models.content });
	}
};
