'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    const model = safeGet(input, 'model');
    model.shippingTips = safeGet(input, 'model.tipsForShipping');
    model.seeAll = safeGet(input, 'model.seeAll');
    const promotedListingModalContentMap = safeGet(input, 'model.plmodalContentMap');
    if (promotedListingModalContentMap) {
        model.plContentMap = {
            closeLabel: safeGet(input, 'model.plmodalContentMap.content.closeLabel.textSpans.0.text'),
            modalError: safeGet(input, 'model.plmodalContentMap.content.modalError.textSpans.0.text'),
            modalTitle: safeGet(input, 'model.plmodalContentMap.content.modalTitle.textSpans.0.text'),
            priorityLabel: safeGet(input, 'model.plmodalContentMap.content.priorityLabel.textSpans.0.text'),
            spinnerLabel: safeGet(input, 'model.plmodalContentMap.content.spinnerLabel.textSpans.0.text'),
            basePath: '/mys/api/'
        };
    }
    model.title = safeGet(input, 'model.title');
    model.subTitle = safeGet(input, 'model.disclaimerText');

    return model;
}


module.exports = {
    getModel
};
