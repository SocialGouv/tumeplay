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

module.exports = {
  /**
   * Send email of daily orders
   * Every day at 7am.
   */
  '* * * * *': async () => {
    const environnements = await strapi.services.environnement.find()
    const environnement_metropole = environnements.find(_ => _.slug === 'metropole')
    const environnement_guyane = environnements.find(_ => _.slug === 'guyane')

    let yesterday_7AM  = new Date();
    yesterday_7AM.setDate(yesterday_7AM.getDate() - 1);
    yesterday_7AM.setHours(7);
    yesterday_7AM.setMinutes(0);
    yesterday_7AM.setMilliseconds(0);

    let today_7AM  = new Date();
    today_7AM.setHours(11);
    today_7AM.setMinutes(0);
    today_7AM.setMilliseconds(0);

    strapi.log.info('', yesterday_7AM)
    strapi.log.info('', today_7AM)

    const orders = await strapi.services.commande.find({created_at_gte: yesterday_7AM.getTime(), created_at_lt: today_7AM.getTime(), _sort: 'created_date:desc'})

    const orders_metropole = 'toto'

    strapi.log.debug('', orders[0].box)
  }
};
