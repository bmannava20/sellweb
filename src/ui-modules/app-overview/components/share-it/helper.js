'use strict';
const safeGet = require('just-safe-get');

function getItemData(data) {
    return {
        image: safeGet(data, 'image'),
        title: safeGet(data, 'title'),
        listingId: safeGet(data, 'listingId'),
        itemStats: safeGet(data, '__me.itemStats'),
        displayTime: safeGet(data, 'displayTime'),
        displayPrice: safeGet(data, 'displayPrice'),
        primaryButtonLabel: safeGet(data, '__me.lineActions.options.0.selections.0.label.textSpans.0.text')
    };
}

module.exports = {
    getItemData
};
