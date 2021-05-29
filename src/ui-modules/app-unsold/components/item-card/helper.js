'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    const data = {
        isChecked: input.isChecked,
        bannerStatus: safeGet(input, 'model.__me.bannerStatus'),
        displayPrice: safeGet(input, 'model.displayPrice'),
        displayPriceMessage: safeGet(input, 'model.displayPriceMessage'),
        additionalPrice: safeGet(input, 'model.additionalPrice'),
        image: safeGet(input, 'model.image'),
        titleTrksid: safeGet(input, 'model.title.action.trackingList.0.eventProperty.sid'),
        title: safeGet(input, 'model.title'),
        titleTextSpans: safeGet(input, 'model.title'),
        listingId: safeGet(input, 'model.listingId'),
        endLabel: safeGet(input, 'model.displayTime.textSpans.0.text'),
        endDate: safeGet(input, 'model.displayTime.textSpans.1.text'),
        displayItemId: safeGet(input, 'model.__me.displayItemId'),
        logisticsCost: safeGet(input, 'model.logisticsCost'),
        userNote: safeGet(input, 'model.__me.noteToSelf'),
        inlineActions: safeGet(input, 'model.__me.lineActions.options'),
        primaryButtonLabel: safeGet(input, 'model.__me.lineActions.options.0.label'),
        primaryButtonAction: safeGet(input, 'model.__me.lineActions.options.0.action'),
        itemUrl: safeGet(input, 'model.action.URL'),
        addNoteContentMap: safeGet(input, 'addEditNoteContentMap'),
        itemActivityModel: {
            watchCount: safeGet(input, 'model.watchCount'),
            bidCount: safeGet(input, 'model.bidCount'),
            viewCount: safeGet(input, 'model.__me.viewCount')
        }
    };
    data.slicedInlineActions = data.inlineActions ? data.inlineActions.slice(1) : [];
    return data;
}

module.exports = {
    getModel
};
