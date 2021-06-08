'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {

    const tumpeplayConditions = [
        {
            displayName: 'Zone métropole',
            category: 'Tumeplay',
            name: 'zone-metropole',
            plugin: 'admin',
            async handler() { 
                return {
                    'theme.environnement': 1
                };
            }
        },
        {
            displayName: 'Zone guyane',
            category: 'Tumeplay',
            name: 'zone-guyane',
            plugin: 'admin',
            async handler() { 
                return {
                    'theme.environnement': 2
                };
            }
        }
    ]

    strapi.admin.services.permission.conditionProvider.registerMany(tumpeplayConditions);
};
