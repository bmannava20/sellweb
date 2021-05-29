'use strict';

const safeGet = require('just-safe-get');

function getModelData(input) {
    const model = input.model || {};
    model.title = safeGet(model, 'title');
    model.attentionAPMText = safeGet(model, 'attentionAPMText');
    model.updateAPMInfoText = safeGet(model, 'updateAPMInfoText');
    model.updatePaymentDisclaimer = safeGet(model, 'updatePaymentDisclaimer');
    const selections = safeGet(model, 'lineActions.options.0.selections');
    if (selections) {
        model.primaryLabel = safeGet(selections, '0.label');
        model.primaryButton = safeGet(selections, '0.label.textSpans.0.text');
        model.primaryAction = safeGet(selections, '0.label.action');
        model.secondaryLabel = safeGet(selections, '1.label');
        model.secondaryBtnLink = safeGet(selections, '1.label.textSpans.0.text');
        model.secondaryAction = safeGet(selections, '1.label.action');
    }
    return model;
}

module.exports = {
    getModelData: getModelData
};
