'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        title: safeGet(input, 'item.title'),
        listingId: safeGet(input, 'item.listingId'),
        image: safeGet(input, 'item.image'),
        displayTime: safeGet(input, 'item.displayTime'),
        displayPrice: safeGet(input, 'item.displayPrice'),
        lineActions: safeGet(input, 'item.__me.lineActions'),
        itemStats: safeGet(input, 'item.__me.itemStats'),
        priceReductionText: safeGet(input, 'item.__me.sellingSuggestion.tipMessage'),
        itemActivityModel: {
            watchCount: safeGet(input, 'item.__me.watchCount'),
            viewCount: safeGet(input, 'item.__me.viewCount')
        }
    };

    data.selections = safeGet(data.lineActions, 'options.0.selections');
    data.secondaryLineAction = safeGet(data.lineActions, 'options.0.selections.1.label.action');
    return data;
}

module.exports = {
    getModelData
};
