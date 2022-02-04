'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async updateForMobileApp(ctx) {
		const body = ctx.request.body;

		const question = await strapi.services['question'].findOne({ text_question: body.title });
		if (!question) {
			return ctx.badRequest(null, 'Question [' + body.title + '] does not exist');
		}

		let content_id
		if (body.title_related_content && body.title_related_content !== "") {
			const content = await strapi.services['content'].findOne({ title: body.title_related_content });
			content_id = content.id || null
		}

		let updatedQuestion = {	
			text_question_mobile: body.newTitle || question.text_question,
			kind: body.kind,
			related_content: content_id,
			responses: {
				response_A: question.responses.response_A,
				response_B: question.responses.response_B,
				response_C: question.responses.response_C,
				response_A_neutral: question.responses.response_A_neutral,
				response_B_neutral: question.responses.response_B_neutral,
				response_C_neutral: question.responses.response_C_neutral,
				right_answer: question.responses.right_answer,
				response_A_mobile: body.response_A_mobile || question.responses.response_A,
				response_B_mobile: body.response_B_mobile || question.responses.response_B,
				response_C_mobile: body.response_C_mobile || question.responses.response_C,
			}
		}

		if (body.new_title) {
			updatedQuestion.text_question_mobile = body.new_title
		}

		const entity = await strapi.services['question'].update({id: question.id}, updatedQuestion)

		return sanitizeEntity(entity, { model: strapi.models.question });
	}
};
