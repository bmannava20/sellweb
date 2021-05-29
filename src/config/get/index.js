'use strict';

const modConfig = require('module-config-inc');

/**
 * Action: get
 * Domain: config
 */
module.exports = () => async key =>
    // put your action logic here
    // you can use async/await and return promise or dirrect object
    new Promise(resolve => {
        modConfig(module, (err, config) => {
            resolve(config.get(key));
        });
    });

