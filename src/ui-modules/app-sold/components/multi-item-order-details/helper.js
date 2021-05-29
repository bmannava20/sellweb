const safeGet = require('just-safe-get');

function getModelData(input) {
    const rootClass = ['sold-order-details'];
    const data = {
        itemAction: safeGet(input, 'model.__me.itemAction'),
        buyerName: safeGet(input, 'model.__me.buyerName'),
        soldDate: safeGet(input, 'model.__me.soldDate'),
        paidDate: safeGet(input, 'model.__me.paidDate'),
        inlineActions: safeGet(input, 'model.__me.lineActions'),
        lineItemCount: safeGet(input, 'model.lineItemCount.textSpans'),
        orderTotalPrice: safeGet(input, 'model.displayTotalPrice.textSpans'),
        orderLogisticsCost: safeGet(input, 'model.buyerSelectedLogistics.logisticsCost.textSpans'),
        refundStatus: safeGet(input, 'model.__me.refundStatus.textSpans'),
        uniqueOrderId: safeGet(input, 'model.__me.uniqueOrderId.textSpans'),
        sellerMarkAsPaid: safeGet(input, 'model.__me.sellerMarkAsPaid.textSpans'),
        payPalPaymentInitiatedDate: safeGet(input, 'model.__me.payPalPaymentInitiatedDate.textSpans'),
        rootClass,
        id: `${rootClass}-${safeGet(input, 'model.id')}`
    };

    data.rootClass.push(safeGet(input, 'model.isMultiOrderMainHeader') ? 'is-multi-order-main-header' : '');
    data.rootClass.push(safeGet(input, 'model.isMultiOrderItemHeader') ? 'is-multi-order-item-header' : '');
    return data;
}

module.exports = {
    getModelData
};
