'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        data: safeGet(input, 'item'),
        title: safeGet(input, 'item.title'),
        listingId: safeGet(input, 'item.listingId'),
        image: safeGet(input, 'item.image'),
        displayTime: safeGet(input, 'item.displayTime'),
        displayPrice: safeGet(input, 'item.displayPrice'),
        itemStats: safeGet(input, 'item.__me.itemStats'),
        offerExpiryTime: safeGet(input, 'item.__me.offerExpiryTime'),
        priceReductionText: safeGet(input, 'item.__me.sellingSuggestion.tipMessage'),
        a11yIndicator: safeGet(input, 'item.title.textSpans.0.text'),
        status: safeGet(input, 'item.status.textSpans'),
        primaryButtonText: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.textSpans.0.text'),
        buttonStyle: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.textSpans.0.styles.0'),
        primaryButtonTracking: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.trackingList'),
        primaryButtonSid: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.trackingList.0.eventProperty.sid')
    };

    return data;
}

module.exports = {
    getModelData
};
