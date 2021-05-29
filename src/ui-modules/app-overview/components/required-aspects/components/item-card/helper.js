'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        data: safeGet(input, 'item'),
        title: safeGet(input, 'item.title'),
        listingId: safeGet(input, 'item.listingId'),
        image: safeGet(input, 'item.image'),
        itemStats: safeGet(input, 'item.__me.itemStats'),
        a11yIndicator: safeGet(input, 'item.title.textSpans.0.text'),
        displayTime: safeGet(input, 'item.displayTime'),
        status: safeGet(input, 'item.status.textSpans'),
        url: (safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.type') !== 'OPERATION') ? safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.URL') : '',
        primaryButtonText: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.textSpans.0.text'),
        primaryButtonActionURL: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.URL'),
        primaryButtonSid: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.trackingList.0.eventProperty.sid'),
        primaryButtonTracking: safeGet(input, 'item.__me.lineActions.options.0.selections.0.label.action.trackingList'),
        addMissingDetails: safeGet(input, 'item.__me.addMissingDetails.textSpans')
    };

    return data;
}

module.exports = {
    getModelData
};
