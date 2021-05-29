'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    const model = safeGet(input, 'model');
    model.shippingTips = safeGet(input, 'model.tipsForShipping');
    model.seeAll = safeGet(input, 'model.seeAll');

    model.title = safeGet(input, 'model.title');
    model.subTitle = safeGet(input, 'model.subTitle');

    model.moduleType = 'willSell';
    if (safeGet(input, 'model._type') === 'RespondToOffersViewModel') {
        model.moduleType = 'respondToOffers';
    } else if (safeGet(input, 'model._type') === 'SIOViewModel') {
        model.moduleType = 'sio';
        if (model.sioModalContentMap) {
            model.sioModalContentMap.closeLabel = safeGet(input, 'model.sioModalContentMap.content.closeLabel.textSpans.0.text');
            model.sioModalContentMap.modalError = safeGet(input, 'model.sioModalContentMap.content.modalError.textSpans.0.text');
            model.sioModalContentMap.modalTitle = safeGet(input, 'model.sioModalContentMap.content.modalTitle.textSpans.0.text');
            model.sioModalContentMap.priorityLabel = safeGet(input, 'model.sioModalContentMap.content.priorityLabel.textSpans.0.text');
            model.sioModalContentMap.spinnerLabel = safeGet(input, 'model.sioModalContentMap.content.spinnerLabel.textSpans.0.text');
        }
    }

    return model;
}


module.exports = {
    getModel
};
