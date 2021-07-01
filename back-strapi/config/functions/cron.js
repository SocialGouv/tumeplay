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
    Vous trouverez en pièce jointe les commandes du <%= yesterday_date %> 07h au <%= today_date %> 07h.\n
    Cordialement,\n
    Le back-office Tumeplay.
  `,
  html: `
    <p>Bonjour,</p>
    <p>Vous trouverez en pièce jointe les commandes du <%= yesterday_date %> 07h au <%= today_date %> 07h.</p>
    <p>
      Cordialement,<br>
      Le back-office Tumeplay.
    </p>
  `
}

const getDateFormatted = (date) => {
  const cleanISODate = new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const onlyDate = _.get(cleanISODate.split(' '), '0', '')
  const onlyTime = _.get(cleanISODate.split(' '), '1', '')
  const splittedOnlyDate = onlyDate.split('-')
  const frenchDate = _.get(splittedOnlyDate, '2', '') + '/' + _.get(splittedOnlyDate, '1', '') + '/' + _.get(splittedOnlyDate, '0', '')

  return frenchDate + ' ' + onlyTime
}

const createColissimoCsv = async (dirpath, today_7AM, orders, environnement_id) => {
  const csvColissimoPath = dirpath + 'orders_colissimo_' + today_7AM.getTime() + '.csv'
  const csvColissimoWriter = createCsvWriter({
    path: csvColissimoPath,
    header: [
      {id: 'date', title: 'Date'},
      {id: 'id', title: 'ID'}, 
      {id: 'last_name', title: 'Nom'}, 
      {id: 'first_name', title: 'Prénom'},
      {id: 'box_title', title: 'Boîte'}, 
      {id: 'address', title: 'Adresse'}, 
      {id: 'address_more', title: 'Complément d\'adresse'}, 
      {id: 'address_zipcode', title: 'Code postale'}, 
      {id: 'address_city', title: 'Commune'}, 
      {id: 'phone', title: 'Téléphone'}
    ]
  });

  let csvColissimoOrders = []
  orders.forEach((order) => {
    const box = _.get(order, 'content[0].box', {})
    if (box.environnement === environnement_id) {
      const date = getDateFormatted(_.get(order, 'created_at', ''))
      csvColissimoOrders.push(
        {
          ..._.pick(order, ['id', 'last_name', 'first_name', 'address', 'address_more', 'address_zipcode', 'address_city']),
          'phone': '+33' + _.get(order, 'phone', '0').slice(1),
          'box_title': _.get(order, 'content[0].box.title', 'null'),
          'date': date
        }
      )
    }
  })

  await csvColissimoWriter.writeRecords(csvColissimoOrders)

  strapi.log.info('CSV COLISSIMO GENERATED WITH PATH : ', csvColissimoPath)

  return csvColissimoPath
};

const createMondialRelayCsv = async (dirpath, today_7AM, orders, environnement_id) => {
  const csvMondialRelayPath = dirpath + 'orders_mondial_relay_' + today_7AM.getTime() + '.csv'
  const csvMondialRelayWriter = createCsvWriter({
    path: csvMondialRelayPath,
    header: [
      {id: 'date', title: 'Date'},
      {id: 'id', title: 'ID'},
      {id: 'box_title', title: 'Boîte'},
      {id: 'address_poi', title: 'Adresse du point relais'},
      {id: 'mr_pdf_link', title: 'Lien vers étiquette'}
    ]
  });

  let csvMondialRelayOrders = []
  orders.forEach((order) => {
    const box = _.get(order, 'content[0].box', {})
    if (box.environnement === environnement_id) {
      const date = getDateFormatted(_.get(order, 'created_at', ''))
      csvMondialRelayOrders.push(
        {
          ..._.pick(order, ['id']),
          'box_title': _.get(order, 'content[0].box.title', 'null'),
          'date': date,
          'address_poi': _.get(order, 'poi_name') + ', ' + _.get(order, 'address') + ', ' + _.get(order, 'address_zipcode') + ' ' + _.get(order, 'address_city'),
          'mr_pdf_link': strapi.config.get('server.api') + 'uploads/orders/mondial-relay/order_mondial_relay_' + order.id + '.pdf'
        }
      )
    }
  })

  await csvMondialRelayWriter.writeRecords(csvMondialRelayOrders)

  strapi.log.info('CSV MONDIAL RELAY GENERATED WITH PATH : ', csvMondialRelayPath)

  return csvMondialRelayPath
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
    today_7AM.setHours(7);
    today_7AM.setMinutes(0);
    today_7AM.setMilliseconds(0);

    const yesterdayFormatted = String(yesterday_7AM.getDate()).padStart(2, '0') + '/' + String(yesterday_7AM.getMonth() + 1).padStart(2, '0') + '/' + yesterday_7AM.getFullYear()
    const todayFormatted = String(today_7AM.getDate()).padStart(2, '0') + '/' + String(today_7AM.getMonth() + 1).padStart(2, '0') + '/' + today_7AM.getFullYear()

    const ordersColissimo = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), delivery: 'home', _sort: 'created_at:desc'})
    const ordersMondialRelay = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), delivery: 'pickup', _sort: 'created_at:desc'})

    const dirpath = 'public/uploads/orders/csv'
    await fs.mkdirSync(dirpath, { recursive: true })

    const csvColissimoPath = await createColissimoCsv(dirpath, today_7AM, ordersColissimo, environnement_metropole.id)
    const csvMondialRelayPath = await createMondialRelayCsv(dirpath, today_7AM, ordersMondialRelay, environnement_metropole.id)

    await strapi.plugins['email'].services.email.sendTemplatedEmail(
      {
        to: strapi.config.get('server.emails.cat'),
        cc: strapi.config.get('server.emails.admin'),
        attachments: [
          {filename: 'commandes_colissimo_' + todayFormatted.split('/').join('') + '.csv', content: fs.createReadStream(csvColissimoPath)},
          {filename: 'commandes_mondial_relay_' + todayFormatted.split('/').join('') + '.csv', content: fs.createReadStream(csvMondialRelayPath)},
        ]
      },
      EMAIL_DAILY_ORDERS,
      {
        yesterday_date: yesterdayFormatted,
        today_date: todayFormatted
      }
    )

    strapi.log.info('EMAIL SENT / CRON OVER at ', new Date().toISOString())
  }
};
