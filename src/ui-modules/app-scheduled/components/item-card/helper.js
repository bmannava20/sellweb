'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = {
        itemId: safeGet(input, 'item.itemCard.listingId'),
        title: safeGet(input, 'item.itemCard.title'),
        image: safeGet(input, 'item.itemCard.image'),
        quantity: safeGet(input, 'item.itemCard.quantity'),
        displayPrice: safeGet(input, 'item.itemCard.displayPrice'),
        displayPriceMessage: safeGet(input, 'item.itemCard.displayPriceMessage'),
        shippingPrice: safeGet(input, 'item.itemCard.logisticsCost'),
        additionalPrice: safeGet(input, 'item.itemCard.additionalPrice'),
        displayTime: safeGet(input, 'item.itemCard.displayTime'),
        displayItemId: safeGet(input, 'item.__me.displayItemId'),
        noteToSelf: safeGet(input, 'item.__me.noteToSelf'),
        addNoteContentMap: input.addNoteContentMap,
        charityAccessibilityText: safeGet(input, 'item.__me.displayCharity.name'),
        scheduledStartDate: safeGet(input, 'item.__me.scheduledStartDate'),
        inlineActions: safeGet(input, 'item.__me.lineActions.options'),
        menuType: 'fake',
        isMenuReverse: true
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
