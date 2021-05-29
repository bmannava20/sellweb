'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        itemId: safeGet(input, 'item.listingId'),
        displayItemId: safeGet(input, 'item.__me.displayItemId'),
        quantity: safeGet(input, 'item.quantity'),
        image: safeGet(input, 'item.image'),
        title: safeGet(input, 'item.title'),
        displayPrice: safeGet(input, 'item.displayPrice'),
        displayPriceMessage: safeGet(input, 'item.displayPriceMessage'),
        additionalPrice: safeGet(input, 'item.additionalPrice'),
        shippingPrice: safeGet(input, 'item.logisticsCost'),
        timeLeft: safeGet(input, 'item.displayTime'),
        itemAction: safeGet(input, 'item.__me.itemAction'),
        secondaryBtnLabel: safeGet(input, 'item.__me.lineActions.options.0.label.textSpans'),
        secondaryBtnAction: safeGet(input, 'item.__me.lineActions.options.0.action'),
        secondaryBtnURL: safeGet(input, 'item.__me.lineActions.options.0.action.URL'),
        secondaryBtnTracking: safeGet(input, 'item.__me.lineActions.options.0.action.trackingList'),
        secondaryBtnSid: safeGet(input, 'item.__me.lineActions.options.0.action.trackingList.0.eventProperty.sid'),
        inlineActions: safeGet(input, 'item.__me.lineActions.options'),
        inlineActionsCount: safeGet(input, 'item.__me.lineActions.options').length || 0,
        ebayNote: safeGet(input, 'item.__me.ebayNote.textSpans') || '',
        ebayNoteAccessibilityText: safeGet(input, 'item.__me.ebayNote.accessibilityText'),
        ebayNoteNoticeType: 'information',
        charityAccessibilityText: safeGet(input, 'item.__me.displayCharity.name'),
        inlineActionsAccessibilityText: safeGet(input, 'item.__me.lineActions.action.accessibilityText'),
        menuType: 'fake',
        isMenuReverse: true,
        itemActivityModel: {
            watchCount: safeGet(input, 'item.__me.watchCount'),
            bidCount: safeGet(input, 'item.bidCount'),
            viewCount: safeGet(input, 'item.__me.viewCount')
        },
        attributedBannerStatus: safeGet(input, 'item.__me.attributedBannerStatus'),
        promoted: safeGet(input, 'item.promoted.textSpans')
    };
    const accessibilityText = safeGet(input, 'item.__me.lineActions.action.accessibilityText');
    if (accessibilityText) {
        data.inlineActionsAccessibilityText = `${accessibilityText} - ${safeGet(input, 'item.title.textSpans.0.text')}`;
    }
    data.slicedInlineActions = data.inlineActions ? data.inlineActions.slice(1) : [];
    return data;
}

module.exports = {
    getModelData
};
