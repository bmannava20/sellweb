'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        image: safeGet(input, 'item.image'),
        title: safeGet(input, 'item.title'),
        listingId: safeGet(input, 'item.listingId'),
        quantity: safeGet(input, 'item.quantity'),
        itemStats: safeGet(input, 'item.__me.itemStats.textSpans'),
        displayPrice: safeGet(input, 'item.displayPrice'),
        status: safeGet(input, 'item.status'),
        lineAction: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label'),
        lineActionContent: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action')
    };

    return data;
}

module.exports = {
    getModelData
};
