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
        lineActions: safeGet(input, 'item.__me.lineActions'),
        itemStats: safeGet(input, 'item.__me.itemStats'),
        offerExpiryTime: safeGet(input, 'item.__me.offerExpiryTime'),
        priceReductionText: safeGet(input, 'item.__me.sellingSuggestion.tipMessage'),
        a11yIndicator: safeGet(input, 'item.title.textSpans.0.text'),
        status: safeGet(input, 'item.status.textSpans'),
        selections: safeGet(input, 'item.__me.lineActions.options.0.selections'),
        primaryButton: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label'),
        itemActivityModel: {
            watchCount: safeGet(input, 'item.__me.watchCount'),
            viewCount: safeGet(input, 'item.__me.viewCount')
        },
        interestedBuyer: safeGet(input, 'item.__me.interestedBuyer.textSpans')
    };

    return data;
}

module.exports = {
    getModelData
};
