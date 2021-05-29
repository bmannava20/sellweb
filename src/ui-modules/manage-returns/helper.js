'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        title: safeGet(input, 'model.title'),
        seeAll: safeGet(input, 'model.seeAll'),
        items: safeGet(input, 'model.lineItems')
    };
    return data;
}

module.exports = {
    getModelData
};
