'use strict';
const safeGet = require('just-safe-get');
const constants = require('../../../../utils/helpers/constants');

function isMultipleOrder(order) {
    return (order && order.displayTotalPrice) !== undefined;
}

function normalize(arr, input) {
    const list = [];
    arr.forEach(order => {
        if (!Array.isArray(order.orderLineItems) || order.orderLineItems.length === 0) {
            return;
        }
        const isMultiOrder = isMultipleOrder(order);
        const orderId = safeGet(order, 'orderId');
        const orderCard = [];
        let itemCard = {};
        itemCard.header = order;
        itemCard.header.isMultiOrderMainHeader = isMultiOrder;
        itemCard.header.id = orderId;
        itemCard.header.cancelUPIContentMap = getCancelUPIContentMap(input, isMultiOrder);
        orderCard.push(itemCard);
        let checkboxLabel = '';
        order.orderLineItems.forEach((item, idx) => {
            itemCard = {};
            const itemId = safeGet(item, 'itemCard.listingId');

            if (isMultiOrder) {
                itemCard.header = item;
                itemCard.header.hideLineAction = true;
                itemCard.header.isMultiOrderItemHeader = isMultiOrder;
                itemCard.header.id = itemId;
            }

            itemCard.body = item;
            itemCard.body.isLastChild = order.orderLineItems.length - 1 === idx;
            itemCard.body.id = itemId;
            itemCard.body.orderId = orderId;
            itemCard.body.isMultiOrder = isMultiOrder;
            checkboxLabel += safeGet(item, 'itemCard.title.textSpans.0.text');
            orderCard.push(itemCard);
        });

        // This is to store the checkbox label for multi item orders.
        // in that case orderCard would have 3 elements,
        // order header and header and body for each item in that order.
        if (orderCard.length === 3) {
            orderCard[0].header.checkboxLabel = checkboxLabel;
        }
        list.push(orderCard);
    });
    return list;
}

function getCancelUPIContentMap(input, isMultiOrder) {
    return {
        spinnerBusyLabel: safeGet(input, 'i18nModule.busyLabel'),
        modalContentMap: isMultiOrder ? safeGet(input, 'model.cancelConfirmationContentMap.content') : safeGet(input, 'model.cancelAndRelistConfirmationContentMap.content'),
        successMessage: safeGet(input, 'model.cancelConfirmationContentMap.content.cancelSuccess')
    };
}

function getModelData(input) {
    return {
        addNoteContentMap: safeGet(input, 'model.addEditNoteContentMap.content'),
        spaCommand: constants.SPA_COMMAND.SOLD,
        items: normalize(safeGet(input, 'model.lineItems') || [], input),
        title: safeGet(input, 'model.title'),
        pagination: safeGet(input, 'model.pagination'),
        accessibilityContent: safeGet(input, 'model.accessibilityContent'),
        showEmptyScreen: safeGet(input, 'model._type') === 'MyeBaySellingEmptyStateModule',
        emptyMessage: safeGet(input, 'model.emptyMessage'),
        startListingLink: safeGet(input, 'model.startListingLink'),
        shipToFundLegalText: safeGet(input, 'model.shipToFundLegalText.textSpans')
    };
}

module.exports = {
    getModelData
};
