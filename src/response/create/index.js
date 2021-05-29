'use strict';

const { Response } = require('runtime-context-ebay').express;

/**
 * Action: create
 * Domain: response
 */
module.exports = () => async parameters => new Response(parameters);
