const safeGet = require('just-safe-get');

function getModelData(input) {
    const rootClass = ['sold-item--header'];

    const cancelAndRelistRetryMsg = safeGet(input, 'model.__me.cancelAndRelistRetryMsg');
    const cancelRetryMsg = safeGet(input, 'model.__me.cancelRetryMsg');
    const cancelUPIContentMap = safeGet(input, 'model.cancelUPIContentMap');
    if (cancelUPIContentMap) {
        cancelUPIContentMap.errorMessage = safeGet(input, 'isMultiOrderMainHeader') ? cancelRetryMsg : cancelAndRelistRetryMsg;
    }

    const data = {
        itemAction: safeGet(input, 'model.__me.itemAction'),
        itemActionParamName: safeGet(input, 'model.__me.itemAction.callToAction.action.name'),
        rootClass,
        id: `${rootClass}-${safeGet(input, 'model.id')}`,
        orderLevelStatus: safeGet(input, 'model.__me.orderLevelStatus'),
        itemLevelStatus: safeGet(input, 'model.__me.itemLevelStatus'),
        buyerNote: {
            label: safeGet(input, 'model.__me.buyerNote.label.textSpans'),
            note: safeGet(input, 'model.__me.buyerNote.note.textSpans.0.text'),
            expandLabel: safeGet(input, 'model.__me.buyerNote.seeMore.textSpans.0.text'),
            collapseLabel: safeGet(input, 'model.__me.buyerNote.seeLess.textSpans.0.text')
        },
        cancelUPIContentMap: cancelUPIContentMap
    };

    const action = safeGet(input, 'model.__me.itemAction.callToAction.action.name') || safeGet(input, 'model.__me.itemAction.callToAction.actionId');
    const mWebShowPrimaryBtn = ['upiCancelAndRelist', 'upiCancel', 'MARK_SHIPPED', 'MARK_PAYMENT_RECEIVED'].includes(action);
    mergeEbayNotices(input, data);
    const fullNote = safeGet(data, 'buyerNote.note');
    data.minimumNote = fullNote ? fullNote.slice(0, 180) : '';
    data.additionalNote = fullNote ? fullNote.slice(180) : '';
    data.showTrailingDots = data.additionalNote !== '';
    data.spinnerBusyLabel = input.spinnerBusyLabel;
    data.mWebShowPrimaryBtn = mWebShowPrimaryBtn;
    return data;
}

// Merging shipToFundStatus, globalShippingProgram for single order.
function mergeEbayNotices(input, data) {
    data.allNotices = [];
    if (safeGet(input, 'model.__me.shipToFundStatus')) {
        data.allNotices.push(safeGet(input, 'model.__me.shipToFundStatus.textSpans'));
    }
    if (safeGet(input, 'model.__me.globalShippingProgram')) {
        data.allNotices.push(safeGet(input, 'model.__me.globalShippingProgram.textSpans'));
    }
}

module.exports = {
    getModelData
};
