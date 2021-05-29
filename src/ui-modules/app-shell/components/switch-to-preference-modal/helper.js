'use strict';

const safeGet = require('just-safe-get');

function getModelData(input) {
    const data = input.model || {};

    return {
        ajax: {
            prefixUrl: safeGet(input, 'configModule.unsoldPage.feAjaxBaseUrl'),
            preferenceId: safeGet(data, 'preferenceId'),
            preferenceKey: safeGet(data, 'preferencekey'),
            preferenceUrl: safeGet(data, 'preferenceURL'),
            classicLink: safeGet(data, 'classicLink'),
            allSellingLink: safeGet(data, 'allSellingLink'),
            srt: safeGet(input, 'csrfTokenModule')
        },
        content: {
            widgetId: 'classPrefModal',
            headerText: safeGet(data, 'contentMap.headerText.textSpans.0.text'),
            middleText1: safeGet(data, 'contentMap.middleText1.textSpans.0.text'),
            linkText: safeGet(data, 'contentMap.middleText1.textSpans.1.text'),
            action: safeGet(data, 'contentMap.middleText1.textSpans.1.action'),
            urlAccessibilityText: safeGet(data, 'contentMap.middleText1.textSpans.1.action.accessibilityText'),
            middleText1End: safeGet(data, 'contentMap.middleText1.textSpans.2.text'),
            middleText2: safeGet(data, 'contentMap.middleText2.textSpans.0.text'),
            continueButtonText: safeGet(data, 'contentMap.continueButton.textSpans.0.text'),
            cancelButtonText: safeGet(data, 'contentMap.cancelButton.textSpans.0.text'),
            closeButtonText: safeGet(data, 'contentMap.closeButton.textSpans.0.accessibilityText') || '',
            middleText2bullet1: safeGet(data, 'contentMap.middleText2bullet1.textSpans.0.text'),
            middleText2bullet2: safeGet(data, 'contentMap.middleText2bullet2.textSpans.0.text'),
            middleText2Header: safeGet(data, 'contentMap.middleText2Header.textSpans.0.text')
        },
        showModal: false
    };
}
module.exports = {
    getModelData: getModelData
};
