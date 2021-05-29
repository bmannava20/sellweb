'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    return {
        ebayNotes: safeGet(input, 'model.eBayNotes')
    };
}

module.exports = {
    getModel
};
