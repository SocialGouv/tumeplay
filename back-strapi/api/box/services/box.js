'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const ALERTS_EMAILING = {
  to: 'lelong@cymit.fr',
  '500' : {
    subject: '[ALERTE] Seuil des 500 atteint pour la box ',
    text: 'La box %s à atteint le seuil des 10, pensez à approvisionner',
    html: 'La box <b>%s</b> à atteint le seuil des 10, pensez à approvisionner',
  },
  '100': {
    subject: '[ALERTE] Seuil des 100 atteint pour la box ',
    text: 'La box %s à atteint le seuil des 10, pensez à approvisionner',
    html: 'La box <b>%s</b> à atteint le seuil des 10, pensez à approvisionner',
  },
  '50': {
    subject: '[ALERTE] Seuil des 50 atteint pour la box ',
    text: 'La box %s à atteint le seuil des 10, pensez à approvisionner',
    html: 'La box <b>%s</b> à atteint le seuil des 10, pensez à approvisionner',
  },
  '10': {
    subject: '[ALERTE] Seuil des 10 atteint pour la box ',
    text: 'La box %s à atteint le seuil des 10, pensez à approvisionner',
    html: 'La box <b>%s</b> à atteint le seuil des 10, pensez à approvisionner',
  }
}

function parse(str) {
  var args = [].slice.call(arguments, 1),
      i = 0;

  return str.replace(/%s/g, () => args[i++]);
}

 module.exports = {
  async decrement(box_id, quantity) {
    await strapi.query('box').model.query((qb) => {
      qb.where('id', box_id);
      qb.increment('stock', - quantity);
    }).fetch();
  },
  async checkBoxAvailability(box_id) {
    const box = await strapi.services.box.findOne({ id: box_id })

    strapi.log.info('', box.stock)
    if (box && box.stock == 500) {
      strapi.log.info('test')
      await strapi.plugins['email'].services.email.send(
        Object.assign(ALERTS_EMAILING['500'], {
          to: ALERTS_EMAILING.to
        })
      );
    } else if (box && box.stock == 100) {
      await strapi.plugins['email'].services.email.send(
        Object.assign(ALERTS_EMAILING['100'], {
          to: ALERTS_EMAILING.to
        })
      );
    } else if (box && box.stock == 50) {
      await strapi.plugins['email'].services.email.send(
        Object.assign(ALERTS_EMAILING['50'], {
          to: ALERTS_EMAILING.to
        })
      );
    } else if (box && box.stock == 10) {
      await strapi.plugins['email'].services.email.send(
        Object.assign(ALERTS_EMAILING['10'], {
          to: ALERTS_EMAILING.to
        })
      );
    }

    return box && box.stock > 0;
  },
};