"use strict";

const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    let user = await strapi.services["utilisateurs-mobile"].findOne({
      user_id: id,
    });
    const history = await strapi.services["historique"].find(
      { user: user.id },
      ["module.niveau"]
    );
    const modules = await strapi.services["module"].find({});

    const success_history = history.filter((h) => h.status === "success");
    const success_modules = success_history.map((h) => h.module);

    const modules_by_levels = _.groupBy(modules, "niveau.value");
    const history_modules_by_levels = _.groupBy(
      success_modules,
      "niveau.value"
    );

    let user_level = 1;
    for (const [level, user_modules] of Object.entries(
      history_modules_by_levels
    )) {
      if (parseInt(level) >= user_level) {
        user_level = parseInt(level);

        if (modules_by_levels[level].length === user_modules.length) {
          user_level += 1;
        }
      }
    }

    user.level = user_level;

    user.history = history.map((item) => {
      return {
        id: item.id,
        module_id: item.module.id,
        status: item.status,
      };
    });

    const pending_history = history.find((h) => h.status === "pending");

    if (pending_history) {
      user.pending_module = pending_history.module.id;
    }

    return user;
  },
};
