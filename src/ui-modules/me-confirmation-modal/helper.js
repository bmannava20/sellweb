'use strict';
const safeGet = require('just-safe-get');

const getModelData = (input) => ({
    'confirmationHeader': safeGet(input, 'model.confirmationContent.title.textSpans'),
    'confirmationContent': safeGet(input, 'model.confirmationContent.content.textSpans'),
    'confirmationAccessibility': safeGet(input, 'model.confirmationContent.close.accessibilityText'),
    'confirmationBtn': safeGet(input, 'model.confirmationContent.confirm.text'),
    'confirmationCancel': safeGet(input, 'model.confirmationContent.cancel.text')
});

module.exports = {
    getModelData: getModelData
};
