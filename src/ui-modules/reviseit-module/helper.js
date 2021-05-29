'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {};
    const sectionId = safeGet(input, 'model._type');
    data.sectionId = sectionId ? sectionId.replace('ViewModel', '') : '';
    data.title = safeGet(input, 'model.title');
    data.subTitle = safeGet(input, 'model.subTitle');
    data.items = safeGet(input, 'model.lineItems');
    return data;
}

module.exports = {
    getModelData
};
