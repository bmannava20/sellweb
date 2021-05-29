const safeGet = require('just-safe-get');

function getModalData(model) {
    const data = {
        shipTipTitle: safeGet(model, 'title.textSpans.0.text'),
        packageText1: safeGet(model, 'packagingTips.textSpans.0.text'),
        packageText2: safeGet(model, 'packagingTips.textSpans.1.text'),
        getHelpAction: safeGet(model, 'packagingTips.textSpans.1.action'),
        handlingText1: safeGet(model, 'handlingTips.textSpans.0.text'),
        handlingText2: safeGet(model, 'handlingTips.textSpans.1.text'),
        handlingAction: safeGet(model, 'handlingTips.textSpans.1.action'),
        labelingText1: safeGet(model, 'labelingTips.textSpans.0.text'),
        labelingText2: safeGet(model, 'labelingTips.textSpans.1.text'),
        labelAction: safeGet(model, 'labelingTips.textSpans.1.action'),
        closeButtonText: safeGet(model, 'closeButton.textSpans.0.accessibilityText'),
        footerLinks: safeGet(model, 'covidShippingInfo')
    };
    return data;
}

module.exports = {
    getModalData
};
