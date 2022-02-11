"use strict";
const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  async changePassword(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const params = _.assign({}, ctx.request.body);
    if (
      params.newPassword &&
      params.confirmNewPassword &&
      params.newPassword === params.confirmNewPassword
    ) {
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch(
        {
          id: userFromContext.id,
        },
        ["role"]
      );

      if (!user) {
        return ctx.badRequest("User does not exist");
      }

      let updateData = { password: params.newPassword };
      const data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: user.id },
        updateData
      );
      return ctx.send(sanitizeUser(data));
    }

    return ctx.badRequest("New passwords do not match.");
  },
  async changeUsername(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const params = _.assign({}, ctx.request.body);
    if (params.username) {
      const user = await strapi.plugins[
        "users-permissions"
      ].services.user.fetch(
        {
          id: userFromContext.id,
        },
        ["role"]
      );

      if (!user) {
        return ctx.badRequest("User does not exist");
      }

      let updateData = { username: params.username };
      const data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: user.id },
        updateData
      );
      return ctx.send(sanitizeUser(data));
    }

    return ctx.badRequest("Missing username.");
  },
  async hasReward(ctx) {
    const { module_id, user_id } = ctx.query;

    let module = await strapi.services.module.findOne({ id: module_id });

    if (!module) {
      return ctx.badRequest("Module " + module_id + " does not exists");
    }

    let level = await strapi.services.niveau.findOne({
      value: module.niveau.value,
    });

    let modules_in_level = await strapi.services.module.find({
      niveau: level.id,
    });

    let history = await strapi.services.historique.find({
      user: user_id,
      status: "success",
    });

    const level_history = history.map((h) => h.module.niveau.id === level.id);

    return level_history.length === modules_in_level.length - 1;
  },
};
