'use strict';
const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
	sanitizeEntity(user, {
		model: strapi.query('user', 'users-permissions').model,
	});

module.exports = {
	async changePassword(ctx) {
		const userFromContext = ctx.state.user;

		if (!userFromContext) {
			return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
		}

		const params = _.assign({}, ctx.request.body);
		if (
			params.newPassword &&
			params.confirmNewPassword &&
			params.newPassword === params.confirmNewPassword
		) {

			const user = await strapi.plugins['users-permissions'].services.user.fetch({
				id: userFromContext.id,
			}, ['role']);

			if (!user) {
				return ctx.badRequest('User does not exist');
			}

			let updateData = { password: params.newPassword };
			const data = await strapi.plugins['users-permissions'].services.user.edit({ id: user.id }, updateData);
			return ctx.send(sanitizeUser(data));
		}

		return ctx.badRequest('New passwords do not match.');
	},
	async changeUsername(ctx) {
		const userFromContext = ctx.state.user;

		if (!userFromContext) {
			return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
		}

		const params = _.assign({}, ctx.request.body);
		if (
			params.username
		) {
			const user = await strapi.plugins['users-permissions'].services.user.fetch({
				id: userFromContext.id,
			}, ['role']);

			if (!user) {
				return ctx.badRequest('User does not exist');
			}

			let updateData = { username: params.username };
			const data = await strapi.plugins['users-permissions'].services.user.edit({ id: user.id }, updateData);
			return ctx.send(sanitizeUser(data));
		}

		return ctx.badRequest('Missing username.');
	}
};