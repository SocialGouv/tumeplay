"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const ALERTS_EMAILING = {
  to: strapi.config.get("server.emails.admin"),
  500: {
    subject: '[ALERTE] Seuil des 500 atteint pour "%s"',
    text: 'La box "%s" a atteint le seuil des 500, pensez à réapprovisionner',
    html: `
      <p>Cher administrateur,</p>
      <p>La box <b>"%s"</b> a atteint le seuil des 500, pensez à réapprovisionner.</p>
      <p>Bien cordialement,<br>Le back-office Tumeplay.</p>
    `,
  },
  100: {
    subject: '[ALERTE] Seuil des 100 atteint pour "%s"',
    text: 'La box "%s" a atteint le seuil des 100, pensez à réapprovisionner',
    html: `
      <p>Cher administrateur,</p>
      <p>La box <b>"%s"</b> a atteint le seuil des 100, pensez à réapprovisionner.</p>
      <p>Bien cordialement,<br>Le back-office Tumeplay.</p>
    `,
  },
  50: {
    subject: '[ALERTE] Seuil des 50 atteint pour "%s"',
    text: 'La box "%s" a atteint le seuil des 50, pensez à réapprovisionner',
    html: `
      <p>Cher administrateur,</p>
      <p>La box <b>"%s"</b> a atteint le seuil des 50, pensez à réapprovisionner.</p>
      <p>Bien cordialement,<br>Le back-office Tumeplay.</p>
    `,
  },
  10: {
    subject: '[ALERTE] Seuil des 10 atteint pour "%s"',
    text: 'La box "%s" a atteint le seuil des 10, pensez à réapprovisionner',
    html: `
      <p>Cher administrateur,</p>
      <p>La box <b>"%s"</b> a atteint le seuil des 10, pensez à réapprovisionner.</p>
      <p>Bien cordialement,<br>Le back-office Tumeplay.</p>
    `,
  },
  0: {
    subject: '[ALERTE CRITIQUE] Plus de stock pour "%s"',
    text: 'La box "%s" n\'est plus disponible, pensez à réapprovisionner.',
    html: `
      <p>Cher administrateur,</p>
      <p>La box <b>"%s"</b> n\'est plus disponible, pensez à réapprovisionner.</p>
      <p>Bien cordialement,<br>Le back-office Tumeplay.</p>
    `,
  },
};

function parse(str) {
  var args = [].slice.call(arguments, 1),
    i = 0;

  return str.replace(/%s/g, () => args[i++]);
}

module.exports = {
  async decrement(box_id, quantity) {
    await strapi
      .query("box")
      .model.query((qb) => {
        qb.where("id", box_id);
        qb.increment("stock", -quantity);
      })
      .fetch();
  },
  async checkBoxAvailability(box_id) {
    const box = await strapi.services.box.findOne({ id: box_id });

    if (box && box.stock == 501) {
      await strapi.plugins["email"].services.email.send(
        Object.assign(
          {
            subject: parse(ALERTS_EMAILING["500"].subject, box.title),
            text: parse(ALERTS_EMAILING["500"].text, box.title),
            html: parse(ALERTS_EMAILING["500"].html, box.title),
          },
          {
            to: ALERTS_EMAILING.to,
            from: "Tumeplay <info.tumeplay@fabrique.social.gouv.fr>",
          }
        )
      );
    } else if (box && box.stock == 101) {
      await strapi.plugins["email"].services.email.send(
        Object.assign(
          {
            subject: parse(ALERTS_EMAILING["100"].subject, box.title),
            text: parse(ALERTS_EMAILING["100"].text, box.title),
            html: parse(ALERTS_EMAILING["100"].html, box.title),
          },
          {
            to: ALERTS_EMAILING.to,
            from: "Tumeplay <info.tumeplay@fabrique.social.gouv.fr>",
          }
        )
      );
    } else if (box && box.stock == 51) {
      await strapi.plugins["email"].services.email.send(
        Object.assign(
          {
            subject: parse(ALERTS_EMAILING["50"].subject, box.title),
            text: parse(ALERTS_EMAILING["50"].text, box.title),
            html: parse(ALERTS_EMAILING["50"].html, box.title),
          },
          {
            to: ALERTS_EMAILING.to,
            from: "Tumeplay <info.tumeplay@fabrique.social.gouv.fr>",
          }
        )
      );
    } else if (box && box.stock == 11) {
      await strapi.plugins["email"].services.email.send(
        Object.assign(
          {
            subject: parse(ALERTS_EMAILING["10"].subject, box.title),
            text: parse(ALERTS_EMAILING["10"].text, box.title),
            html: parse(ALERTS_EMAILING["10"].html, box.title),
          },
          {
            to: ALERTS_EMAILING.to,
            from: "Tumeplay <info.tumeplay@fabrique.social.gouv.fr>",
          }
        )
      );
    } else if (box && box.stock == 1) {
      await strapi.plugins["email"].services.email.send(
        Object.assign(
          {
            subject: parse(ALERTS_EMAILING["0"].subject, box.title),
            text: parse(ALERTS_EMAILING["0"].text, box.title),
            html: parse(ALERTS_EMAILING["0"].html, box.title),
          },
          {
            to: ALERTS_EMAILING.to,
            from: "Tumeplay <info.tumeplay@fabrique.social.gouv.fr>",
          }
        )
      );
    }

    return box && box.stock > 0;
  },
};
