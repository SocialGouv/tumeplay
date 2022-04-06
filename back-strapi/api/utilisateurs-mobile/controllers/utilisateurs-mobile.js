"use strict";

const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const questionsModuleToArray = async (questions) => {
  let questionsArray = [];

  var indexes = new Array(10).fill(0);

  for (const index of indexes.keys()) {
    if (questions["question_" + (index + 1)]) {
      const question = await strapi.services.question.findOne({
        id: questions["question_" + (index + 1)].id,
      });
      questionsArray.push({
        id: question.id,
        text_question: question.text_question_mobile,
        text_answer: question.text_answer,
        kind: question.kind,
        responses: {
          right_answer: question.responses.right_answer,
          response_A: question.responses.response_A_mobile,
          response_B: question.responses.response_B_mobile,
          response_C: question.responses.response_C_mobile,
        },
      });
    }
  }

  return questionsArray;
};

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const { version = 1 } = ctx.query;
    strapi.log.debug("GET USER v", version);

    let user = await strapi.services["utilisateurs-mobile"].findOne({
      user_id: id,
    });

    if (!user) {
      return {
        user_id: "",
        id: 0,
        history: [],
        error: "User not found",
        status: 404,
      };
    }

    const levels = await strapi.services["niveau"].find({});
    let history = await strapi.services["historique"].find({ user: user.id });
    history = history.map((h) => {
      h.module.niveau = levels.find((l) => l.id === h.module.niveau);
      return h;
    });
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

    if (
      modules_by_levels[user.level] &&
      modules_by_levels[user.level].length > 0
    ) {
      const history_module_ids_in_level = _.map(
        (history_modules_by_levels[user.level] || []).filter((_) => {
          const tmpHistory = success_history.find((h) => h.module.id === _.id);
          return tmpHistory && tmpHistory.status === "success";
        }),
        "id"
      );

      const available_modules = _.filter(
        modules_by_levels[user.level],
        (module) => {
          return !_.includes(history_module_ids_in_level, module.id);
        }
      );
      const next_module = _.sample(available_modules);

      if (version === 1) {
        user.next_module = _.get(next_module, "id", null);
      } else {
        user.next_module = {
          id: _.get(next_module, "id", null),
          title: _.get(next_module, "title", ""),
          theme_id: _.get(next_module, "thematique_mobile.id", null),
          theme_title: _.get(next_module, "thematique_mobile.title", " "),
          theme_color: _.get(next_module, "thematique_mobile.color", " "),
          theme_image: _.get(next_module, "thematique_mobile.image", ""),
        };
      }

      user.next_module_questions = await questionsModuleToArray(
        next_module.questions
      );

      const nb_modules_in_level = (modules_by_levels[user.level] || []).length;
      const nb_modules_completed_in_level = (
        history_modules_by_levels[user.level] || []
      ).length;
      user.percentage_level_completed =
        nb_modules_completed_in_level / nb_modules_in_level || 0;

      const pending_history = history.find((h) => h.status === "pending");

      if (pending_history) {
        user.pending_module_questions = await questionsModuleToArray(
          pending_history.module.questions
        );

        if (version === 1) {
          user.pending_module = _.get(pending_history, "module.id", null);
        } else {
          const pending_module_id = pending_history.module.id;
          history.pending_module = _.find(modules, { id: pending_module_id });
          user.pending_module = {
            id: _.get(history, "pending_module.id", null),
            title: _.get(history, "pending_module.title", ""),
            theme_id: _.get(
              history,
              "pending_module.thematique_mobile.id",
              null
            ),
            theme_title: _.get(
              history,
              "pending_module.thematique_mobile.title",
              ""
            ),
            theme_color: _.get(
              history,
              "pending_module.thematique_mobile.color",
              ""
            ),
            theme_image: _.get(
              history,
              "pending_module.thematique_mobile.image",
              ""
            ),
          };
        }
      }
    } else {
      user.hasFinished = true;

      const random_module = _.get(_.shuffle(modules), "0", {});
      user.random_module_questions = await questionsModuleToArray(
        random_module.questions
      );

      if (version === 1) {
        user.random_module = random_module.id;
      } else {
        user.random_module = {
          id: _.get(random_module, "id", null),
          title: _.get(random_module, "title", ""),
          theme_id: _.get(random_module, "thematique_mobile.id", null),
          theme_title: _.get(random_module, "thematique_mobile.title", ""),
          theme_color: _.get(random_module, "thematique_mobile.color", ""),
          theme_image: _.get(random_module, "thematique_mobile.image", ""),
        };
      }
    }

    const orders_count = await strapi.services["commande"].count({
      utilisateurs_mobile: user.id,
    });

    let credits = 0;
    if (user.level > 5) {
      credits = 3;
    } else if (user.level > 3) {
      credits = 2;
    } else if (user.level > 1) {
      credits = 1;
    }

    user.credits = credits - orders_count;

    return user;
  },
};
