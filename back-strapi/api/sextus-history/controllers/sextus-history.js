"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["sextus-history"].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services["sextus-history"].update(
        { id },
        ctx.request.body
      );
    }

    const successSextusHistoryCount = await strapi.services[
      "sextus-history"
    ].count({
      utilisateurs_mobile: entity.utilisateurs_mobile.id,
      status: "success",
    });

    await strapi.services["utilisateurs-mobile"].update(
      { id: entity.utilisateurs_mobile.id },
      {
        points: successSextusHistoryCount,
      }
    );

    return sanitizeEntity(entity, { model: strapi.models["sextus-history"] });
  },
};
