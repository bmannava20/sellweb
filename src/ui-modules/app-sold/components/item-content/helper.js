const safeGet = require('just-safe-get');

function getModelData(input) {
    const rootClass = ['sold-item--content'];
    const data = {
        transactionId: safeGet(input, 'model.transactionId') || safeGet(input, 'model.__me.transactionId'),
        image: safeGet(input, 'model.itemCard.image'),
        imageAltTag: safeGet(input, 'model.itemCard.title'),
        orderStatus: safeGet(input, 'model.__me.orderStatus.textSpans'),
        showIcon: safeGet(input, 'model.__me.orderStatus.value.name'),
        showIconAriaText: safeGet(input, 'model.__me.orderStatus.value.accessibilityText'),
        title: safeGet(input, 'model.itemCard.title'),
        itemId: safeGet(input, 'model.__me.itemId.textSpans'),
        buyerName: safeGet(input, 'model.__me.buyerName'),
        soldDate: safeGet(input, 'model.__me.soldDate'),
        paidDate: safeGet(input, 'model.__me.paidDate'),
        quantity: safeGet(input, 'model.quantity.textSpans'),
        displayPrice: safeGet(input, 'model.itemCard.displayPrice.textSpans'),
        logisticsCost: safeGet(input, 'model.itemCard.logisticsCost.textSpans'),
        inlineActions: safeGet(input, 'model.__me.lineActions'),
        shipTrackingActions: safeGet(input, 'model.__me.shipTrackingActions'),
        skuVariations: safeGet(input, 'model.__me.skuVariations'),
        refundStatus: safeGet(input, 'model.__me.refundStatus.textSpans'),
        isLastChild: safeGet(input, 'model.isLastChild'),
        isMultiOrder: safeGet(input, 'model.isMultiOrder'),
        id: `${rootClass}-${safeGet(input, 'model.id')}`,
        listingId: safeGet(input, 'model.itemCard.listingId'),
        itemLevelStatus: safeGet(input, 'model.__me.itemLevelStatus'),
        sellerMarkAsPaid: safeGet(input, 'model.__me.sellerMarkAsPaid.textSpans'),
        payPalPaymentInitiatedDate: safeGet(input, 'model.__me.payPalPaymentInitiatedDate.textSpans'),
        userNote: safeGet(input, 'model.__me.noteToSelf'),
        addNoteContentMap: input.addNoteContentMap,
        eBayNotes: safeGet(input, 'model.__me.eBayNotes'),
        shipToFundStatus: safeGet(input, 'model.__me.shipToFundStatus'),
        globalShippingProgram: safeGet(input, 'model.__me.globalShippingProgram'),
        orderId: safeGet(input, 'model.orderId'),
        uniqueOrderId: safeGet(input, 'model.__me.uniqueOrderId.textSpans'),
        buyerFeedback: safeGet(input, 'model.__me.buyerFeedback.textSpans'),
        promoted: safeGet(input, 'model.__me.promoted.textSpans'),
        psa: safeGet(input, 'model.__me.postSaleAuthenticationOrder.textSpans'),
        escrow: safeGet(input, 'model.__me.escrowOrder.textSpans'),
        closeLabel: safeGet(input, 'accessibilityContent.close.textSpans.0.text')
    };

    mergeItemStatuses(data, input);
    mergeEbayNotices(data);
    // set showLineAction value for multi item order, multi item order item card data contract doesnt have buyername and solddate
    data.showLineAction = data.buyerName && data.soldDate;
    rootClass.push(data.isLastChild ? 'last-child' : '');
    rootClass.push(data.isMultiOrder ? 'is-multi-order' : '');
    data.rootClass = rootClass;
    data.imageSize = data.isMultiOrder ? 'medium' : 'large';
    return data;
}

function mergeItemStatuses(data, input) {
    data.allStatuses = [];

    const psa = data.psa;
    if (psa) {
        const psaInfoTip = safeGet(input, 'model.__me.postSaleAuthenticationOrder.textSpans.0.tooltip');
        if (psaInfoTip) {
            const psaData = {};
            psaData.label = psa;
            psaData.infoTip = safeGet(input, 'model.__me.postSaleAuthenticationInfoTip');
            psaData.closeLabel = data.closeLabel;
            psaData.modal = psaInfoTip !== 'true';
            psaData.infoTipAccText = safeGet(input, 'model.__me.postSaleAuthenticationInfoTip.textSpans.0.accessibilityText');
            data.allStatuses.push(psaData);
        } else {
            data.allStatuses.push(psa);
        }
    }

    const escrow = data.escrow;
    if (escrow) {
        const escrowInfoTip = safeGet(input, 'model.__me.escrowOrder.textSpans.0.tooltip');
        if (escrowInfoTip) {
            const escrowData = {};
            escrowData.label = escrow;
            escrowData.infoTip = safeGet(input, 'model.__me.escrowInfoTip');
            escrowData.closeLabel = data.closeLabel;
            escrowData.modal = escrowInfoTip !== 'true';
            escrowData.infoTipAccText = safeGet(input, 'model.__me.escrowInfoTip.textSpans.0.accessibilityText');
            data.allStatuses.push(escrowData);
        } else {
            data.allStatuses.push(escrow);
        }
    }
    const buyerFeedback = data.buyerFeedback;
    if (buyerFeedback) {
        data.allStatuses.push(buyerFeedback);
    }
    const promoted = data.promoted;
    if (promoted) {
        data.allStatuses.push(promoted);
    }
}
// Merging shipToFundStatus and eBayNotes, globalShippingProgram for single order.
function mergeEbayNotices(data) {
    data.allNotices = [];
    if (data.eBayNotes) {
        data.allNotices = data.allNotices.concat(data.eBayNotes.map(eBayNote => eBayNote.note.textSpans));
    }

    if (data.shipToFundStatus) {
        data.allNotices.push(data.shipToFundStatus.textSpans);
    }
    if (data.globalShippingProgram) {
        data.allNotices.push(data.globalShippingProgram.textSpans);
    }
}

module.exports = {
    getModelData
};
