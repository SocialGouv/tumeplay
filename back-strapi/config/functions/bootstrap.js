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
            displayName: 'Zone métropole simple',
            category: 'Tumeplay-Métropole',
            name: 'simple-zone-metropole',
            plugin: 'admin',
            async handler() { 
                return {
                    'environnement.id': 1,
                };
            }
        },
        {
            displayName: 'Zone guyane simple',
            category: 'Tumeplay-Guyane',
            name: 'simple-zone-guyane',
            plugin: 'admin',
            async handler() { 
                return {
                    'environnement.id': 2,
                };
            }
        },
        {
            displayName: 'Zone métropole thèmes',
            category: 'Tumeplay-Métropole',
            name: 'theme-zone-metropole',
            plugin: 'admin',
            async handler() { 
                return {
                    'theme.environnement': 1,
                };
            }
        },
        {
            displayName: 'Zone guyane thèmes',
            category: 'Tumeplay-Guyane',
            name: 'theme-zone-guyane',
            plugin: 'admin',
            async handler() { 
                return {
                    'theme.environnement': 2,
                };
            }
        },
        {
            displayName: 'Zone métropole commandes',
            category: 'Tumeplay-Métropole',
            name: 'order-zone-metropole',
            plugin: 'admin',
            async handler() { 
                return {
										'$or': [
											{'address_deptcode_ne': '973'},
											{'environnement': 1}
										]
                };
            }
        },
        {
            displayName: 'Zone guyane commandes',
            category: 'Tumeplay-Guyane',
            name: 'order-zone-guyane',
            plugin: 'admin',
            async handler() { 
                return {
									'$or': [
                    {'address_deptcode': '973'},
										{'environnement': 2}
									]
                };
            }
        },
    ]

    strapi.admin.services.permission.conditionProvider.registerMany(tumpeplayConditions);
};
