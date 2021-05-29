'use strict';

const safeGet = require('just-safe-get');

function getModelData(input) {
    const model = input.model || {};
    model.title = safeGet(model, 'title');
    model.disclaimerText = safeGet(model, 'disclaimerText');
    model.headerTitle = safeGet(model, 'headerTitle');
    const selections = safeGet(model, 'lineActions.options.0.selections');
    if (selections) {
        model.primaryButton = safeGet(selections, '0.label');
        model.primaryAction = safeGet(selections, '0.label.action');
    }
    return model;
}

module.exports = {
    getModelData
};
