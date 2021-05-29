'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    const model = safeGet(input, 'model');
    if (!model) {
        return;
    }
    model.seeAll = safeGet(input, 'model.seeAll');
    model.title = safeGet(input, 'model.title');
    model.subTitle = safeGet(input, 'model.disclaimerText');
    const contentMap = {
        title: safeGet(input, 'model.iFrameContentMap.content.modalTitle.textSpans.0.text'),
        errorMessage: safeGet(input, 'model.iFrameContentMap.content.modalError.textSpans.0.text'),
        successMessage: safeGet(input, 'model.iFrameContentMap.content.successMessage'),
        busyLabel: safeGet(input, 'model.iFrameContentMap.content.spinnerLabel.textSpans.0.text'),
        closeLabel: safeGet(input, 'model.iFrameContentMap.content.closeLabel.textSpans.0.text')
    };

    model.contentMap = contentMap;
    return model;
}


module.exports = {
    getModel
};
