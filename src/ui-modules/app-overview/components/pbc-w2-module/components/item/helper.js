'use strict';
const safeGet = require('just-safe-get');

function actionHelper(input) {
    const btnPriority = safeGet(input, 'pbcItem.__me.lineActions.options.0.selections.0.label.textSpans.0.styles.0');
    return {
        btn: safeGet(input, 'pbcItem.__me.lineActions.options.0.selections.0.label'),
        action: safeGet(input, 'pbcItem.__me.lineActions.options.0.selections.0.label.action'),
        actionType: safeGet(input, 'pbcItem.__me.lineActions.options.0.selections.0.label.action.type'),
        btnPriority,
        btnStyle: (btnPriority === 'PROMOTED') ? 'primary' : '',
        btnText: safeGet(input, 'pbcItem.__me.lineActions.options.0.selections.0.label.textSpans.0.text')
    };
}

const extractFirstProductErrorMessage = function(messages) {
    return Array.isArray(messages) ? messages.slice(1) : [];
};

function productMessageHelper(input) {
    return {
        productMessages: extractFirstProductErrorMessage(input),
        firstProductMessage: safeGet(input, '0.textSpans')
    };
}
module.exports = {
    actionHelper,
    productMessageHelper
};
