'use strict';
const safeGet = require('just-safe-get');

const extractFirstLineAction = function(lineActions) {
    if (lineActions) {
        return Array.isArray(lineActions) ? lineActions.slice(1) : [];
    }
    return [];
};

function getModelData(input) {
    const accessibilityMenuIdentifier = safeGet(input, 'item.listingSummary.title.textSpans.0.text') ?
        safeGet(input, 'item.listingSummary.title.textSpans.0.text') : safeGet(input, 'item.orderId');
    const callToActionBtn = safeGet(input, 'item.__me.lineActions.options.0.selections.0');
    return {
        'itemId': safeGet(input, 'item.id') || safeGet(input, 'item.listingSummary.id'),
        'lineItemCountLabel': safeGet(input, 'item.__me.lineItemCountLabel'),
        'orderTotalLabel': safeGet(input, 'item.__me.displayTotalPriceLabel'),
        'lineItemCount': safeGet(input, 'item.lineItemCount'),
        'displayTotalPrice': safeGet(input, 'item.displayTotalPrice'),
        'image': safeGet(input, 'item.listingSummary.image'),
        'imageTitle': safeGet(input, 'item.listingSummary.title'),
        'item': safeGet(input, 'item'),
        'lineActions': extractFirstLineAction(safeGet(input, 'item.__me.lineActions.options.0.selections')),
        'paymentsMethod': safeGet(input, 'item__me.paymentsMethod'),
        'taskTracker': safeGet(input, 'item.__me') /** not a good idea **/,
        'dsplyPrce': safeGet(input, 'item.listingSummary.displayPrice'),
        'soldDateNew': safeGet(input, 'item.__me.soldDateNew.textSpans'),
        'ctaBannerContent': safeGet(input, 'item.__me.ctaBannerContent'),
        'ctaBannerTitle': safeGet(input, 'item.__me.ctaBannerTitle'),
        'callToActionBtn': {
            'btnTextLabel': safeGet(callToActionBtn, 'label'),
            'btnText': safeGet(callToActionBtn, 'label.textSpans.0.text'),
            'btnAction': safeGet(callToActionBtn, 'label.action'),
            'btnActionValue': safeGet(callToActionBtn, 'label.value') || safeGet(callToActionBtn, 'label.action.name'),
            'btnActionType': safeGet(callToActionBtn, 'label.action.type'),
            'sid': safeGet(callToActionBtn, 'label.action.trackingList.0.eventProperty.sid'),
            'trackingList': safeGet(callToActionBtn, 'label.action.trackingList'),
            'listingId': safeGet(callToActionBtn, 'label.action.params.contractIds'),
            'btnStyle': safeGet(callToActionBtn, 'label.textSpans.0.styles.0')
        },
        labelContext: safeGet(input, 'item.title.textSpans.0.text'),
        accessibilityText: `${safeGet(input, 'item.__me.lineActions.options.0.label.textSpans.0.text')} - ${accessibilityMenuIdentifier}`,
        skuVariations: safeGet(input, 'item.__me.skuVariations.textSpans'),
        itemQuantity: safeGet(input, 'item.listingSummary.quantity.textSpans'),
        buyerName: safeGet(input, 'item.__me.buyerName.textSpans')
    };
}

module.exports = {
    getModelData: getModelData
};
