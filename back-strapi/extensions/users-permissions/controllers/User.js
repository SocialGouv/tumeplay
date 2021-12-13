const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

module.exports = {
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    const userQuery = strapi.query('user', 'users-permissions');
    const userWithReferents = await userQuery.findOne({ id: user.id }, ['role', 'referents']);

    return sanitizeUser(userWithReferents, { model: userQuery.model });
  },
};