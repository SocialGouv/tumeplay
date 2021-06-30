'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _ = require('lodash');
const fs = require('fs');

const EMAIL_DAILY_ORDERS = {
  subject: 'Les commandes du jour',
  text: `
    Bonjour,\n
    Vous trouverez en pièce jointe les commandes du <%= date %>.\n
    Cordialement,\n
    Le back-office Tumeplay.
  `,
  html: `
    <p>Bonjour,</p>
    <p>Vous trouverez en pièce jointe les commandes du <%= date %>.</p>
    <p>
      Cordialement,<br>
      Le back-office Tumeplay.
    </p>
  `
}

const createColissimoCsv = async (dirpath, today_7AM, orders) => {
  const csvColissimoPath = dirpath + 'orders_colissimo_' + today_7AM.getTime() + '.csv'
  const csvColissimoWriter = createCsvWriter({
    path: csvColissimoPath,
    header: [
      {id: 'id', title: 'ID'}, 
      {id: 'last_name', title: 'Nom'}, 
      {id: 'first_name', title: 'Prénom'}, 
      {id: 'address', title: 'Adresse'}, 
      {id: 'address_more', title: 'Complément d\'adresse'}, 
      {id: 'address_zipcode', title: 'Code postale'}, 
      {id: 'address_city', title: 'Commune'}, 
      {id: 'phone', title: 'Téléphone'}
    ]
  });

  let csvColissimoOrders = []
  orders.forEach((order) => {
    csvColissimoOrders.push(
      _.pick(order, ['id', 'last_name', 'first_name', 'address', 'address_more', 'address_zipcode', 'address_city', 'phone'])
    )
  })

  await csvColissimoWriter.writeRecords(csvColissimoOrders)

  strapi.log.info('CSV COLISSIMO GENERATED WITH PATH : ', csvColissimoPath)

  return csvColissimoPath
};

module.exports = {
  /**
   * Send email of daily orders
   * Every day at 7am.
   */
  '0 7 * * *': async () => {
    const environnements = await strapi.services.environnement.find()
    const environnement_metropole = environnements.find(_ => _.slug === 'metropole')
    const environnement_guyane = environnements.find(_ => _.slug === 'guyane')

    let yesterday_7AM  = new Date();
    yesterday_7AM.setDate(yesterday_7AM.getDate() - 1);
    yesterday_7AM.setHours(7);
    yesterday_7AM.setMinutes(0);
    yesterday_7AM.setMilliseconds(0);

    let today_7AM  = new Date();
    today_7AM.setHours(18);
    today_7AM.setMinutes(0);
    today_7AM.setMilliseconds(0);

    const yesterDayFormatted = String(yesterday_7AM.getDate()).padStart(2, '0') + '/' + String(yesterday_7AM.getMonth() + 1).padStart(2, '0') + '/' + yesterday_7AM.getFullYear()

    const ordersColissimo = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), delivery: 'home', _sort: 'created_at:desc'})

    const dirpath = 'public/uploads/orders/'
    await fs.mkdirSync(dirpath, { recursive: true })

    const csvColissimoPath = await createColissimoCsv(dirpath, today_7AM, ordersColissimo)

    await strapi.plugins['email'].services.email.sendTemplatedEmail(
      {
        to: strapi.config.get('server.emails.cat'),
        cc: strapi.config.get('server.emails.admin'),
        attachments: [
          {filename: 'commandes_colissimo_' + yesterDayFormatted.split('/').join('') + '.csv', content: fs.createReadStream(csvColissimoPath)},
        ]
      },
      EMAIL_DAILY_ORDERS,
      {
        date: yesterDayFormatted
      }
    )
  }
};
