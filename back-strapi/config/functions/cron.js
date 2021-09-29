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

  const box_numbers = _.uniq(
    orders.map((order) => {
      var box_number = _.get(order.content, '[0].box.number', null)
      if (box_number) return box_number
    })
  )

  let csvColissimoOrders = {}

  box_numbers.forEach((number) => csvColissimoOrders[number] = [])

  orders.forEach((order) => {
    const box = _.get(order, 'content[0].box', {})
    if (box.environnement === environnement_id) {
      const date = getDateFormatted(_.get(order, 'created_at', ''))
      csvColissimoOrders[box.number].push(
        {
          ..._.pick(order, ['id', 'last_name', 'first_name', 'address', 'address_more', 'address_zipcode', 'address_city']),
          'phone': '+33' + _.get(order, 'phone', '0').slice(1),
          'box_number': _.get(order, 'content[0].box.number', 'null'),
          'date': date
        }
      )
    }
  })

  let csvColissimoPaths = []

  for (const [number, boxOrders] of Object.entries(csvColissimoOrders)) {
    if (boxOrders.length > 0) {
      const path = dirpath + 'orders_collisimo_box_' + number + '_' + today_7AM.getTime() + '.csv'
      const csvColissimoWriter = createCsvWriter({
        path: path,
        header: [
          {id: 'date', title: 'date'},
          {id: 'id', title: 'id'},
          {id: 'last_name', title: 'nom'},
          {id: 'first_name', title: 'prenom'},
          {id: 'box_number', title: 'numéro boite'},
          {id: 'address', title: 'adresse'},
          {id: 'address_more', title: 'comple'},
          {id: 'address_zipcode', title: 'cp'},
          {id: 'address_city', title: 'ville'},
          {id: 'phone', title: 'tph'}
        ]
      });


      await csvColissimoWriter.writeRecords(boxOrders)

      csvColissimoPaths.push({
        number: number,
        path: path
      })
    }
  }

  strapi.log.info('CSV COLISSIMO GENERATED WITH PATHS : ', csvColissimoPaths.map(r => r.path).join(' / '))

  return csvColissimoPaths
};

const createMondialRelayCsv = async (dirpath, today_7AM, orders, environnement_id) => {

  const box_numbers = _.uniq(
    orders.map((order) => {
      var box_number = _.get(order.content, '[0].box.number', null)
      if (box_number) return box_number
    })
  )

  let csvMondialRelayOrders = {}

  box_numbers.forEach((number) => csvMondialRelayOrders[number] = [])

  orders.forEach((order) => {
    const box = _.get(order, 'content[0].box', {})
    if (box.environnement === environnement_id) {
      const date = getDateFormatted(_.get(order, 'created_at', ''))
      csvMondialRelayOrders[box.number].push(
        {
          ..._.pick(order, ['id']),
          'box_number': _.get(order, 'content[0].box.number', 'null'),
          'date': date,
          'address_poi': _.get(order, 'poi_name') + ', ' + _.get(order, 'address') + ', ' + _.get(order, 'address_zipcode') + ' ' + _.get(order, 'address_city'),
          'mr_pdf_link': strapi.config.get('server.url') + '/uploads/orders/mondial-relay/order_mondial_relay_' + order.id + '.pdf'
        }
      )
    }
  })

  let csvMondialRelayPaths = []

  for (const [number, boxOrders] of Object.entries(csvMondialRelayOrders)) {
    if (boxOrders.length > 0) {
      const path = dirpath + 'orders_mondial_relay_box_' + number + '_' + today_7AM.getTime() + '.csv'
      const csvMondialRelayWriter = createCsvWriter({
        path: path,
        header: [
          {id: 'date', title: 'Date'},
          {id: 'id', title: 'ID'},
          {id: 'box_number', title: 'Boîte'},
          {id: 'address_poi', title: 'Adresse du point relais'},
          {id: 'mr_pdf_link', title: 'Lien vers étiquette'}
        ]
      });


      if (boxOrders.length > 0) {
        await csvMondialRelayWriter.writeRecords(boxOrders)

        csvMondialRelayPaths.push({
          number: number,
          path: path
        })
      }
    }
  }

  strapi.log.info('CSV MONDIAL RELAY GENERATED WITH PATHS : ', csvMondialRelayPaths.map(r => r.path).join(' / '))

  return csvMondialRelayPaths
};

module.exports = {
  /**
   * Send email of daily orders
   * Every day at 7am.
   */
  '0 5 * * *': async () => {
    const environnements = await strapi.services.environnement.find()
    const environnement_metropole = environnements.find(_ => _.slug === 'metropole')
    const environnement_guyane = environnements.find(_ => _.slug === 'guyane')

    let yesterday_7AM  = new Date();
    yesterday_7AM.setDate(yesterday_7AM.getDate() - 1);
    yesterday_7AM.setHours(5);
    yesterday_7AM.setMinutes(0);
    yesterday_7AM.setMilliseconds(0);

    let today_7AM  = new Date();
    today_7AM.setHours(5);
    today_7AM.setMinutes(0);
    today_7AM.setMilliseconds(0);

    const yesterdayFormatted = String(yesterday_7AM.getDate()).padStart(2, '0') + '/' + String(yesterday_7AM.getMonth() + 1).padStart(2, '0') + '/' + yesterday_7AM.getFullYear()
    const todayFormatted = String(today_7AM.getDate()).padStart(2, '0') + '/' + String(today_7AM.getMonth() + 1).padStart(2, '0') + '/' + today_7AM.getFullYear()

    const ordersColissimo = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), delivery: 'home', sent: false, _sort: 'created_at:desc'})
    const ordersMondialRelay = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), delivery: 'pickup', sent: false, _sort: 'created_at:desc'})

    const dirpath = 'public/uploads/orders/csv'
    await fs.mkdirSync(dirpath, { recursive: true })

    const csvColissimoPaths = await createColissimoCsv(dirpath, today_7AM, ordersColissimo, environnement_metropole.id)
    const csvMondialRelayPaths = await createMondialRelayCsv(dirpath, today_7AM, ordersMondialRelay, environnement_metropole.id)

    const attachments = []
    csvColissimoPaths.forEach((csvColissimoPath) => {
      attachments.push(
        {filename: 'commandes_colissimo_box_' + csvColissimoPath.number + '_' + yesterdayFormatted.split('/').join('') + '_' + todayFormatted.split('/').join('') + '.csv', content: fs.createReadStream(csvColissimoPath.path)}
      )
    })
    csvMondialRelayPaths.forEach((csvMondialRelayPath) => {
      attachments.push(
        {filename: 'commandes_mondial_relay_box_' + csvMondialRelayPath.number + '_' + yesterdayFormatted.split('/').join('') + '_' + todayFormatted.split('/').join('') + '.csv', content: fs.createReadStream(csvMondialRelayPath.path)}
      )
    })

    await strapi.plugins['email'].services.email.sendTemplatedEmail(
      {
        to: strapi.config.get('server.emails.cat'),
        cc: strapi.config.get('server.emails.admin'),
        attachments: attachments
      },
      EMAIL_DAILY_ORDERS,
      {
        yesterday_date: yesterdayFormatted,
        today_date: todayFormatted
      }
    )

    strapi.log.info('EMAIL SENT / CRON OVER at ', new Date().toISOString())
  },
  '0 5 * * *': async () => {
    const cat_users = await strapi.query('user', 'users-permissions').find({'role.type': 'cat'})
    await cat_users.forEach((user) => {
      const cat_template = {
      subject: "Bienvenue sur l'outil de pilotage des commandes",
      text: `Bienvenue, pour rappel vous pouvez maintenant traiter les commandes ici :
        https://bo-tumeplay.fabrique.social.gouv.fr/orders/box/1
        Pour toutes informations complémentaires merci de contacter l'équipe Tumeplay
      `,
      html: `
            <p>Bienvenue, pour rappel vous pouvez maintenant traiter les commandes ici :
        https://bo-tumeplay.fabrique.social.gouv.fr/orders/box/1
        Pour toutes informations complémentaires merci de contacter l'équipe Tumeplay </p>
      `
      }
      strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: user.email
        },
        cat_template
      )
    })
  }

};
