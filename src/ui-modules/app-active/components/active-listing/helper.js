'use strict';
const safeGet = require('just-safe-get');

function getModelData(state) {
    const sioModalContentMap = safeGet(state, 'model.sioModalContentMap');
    const promotedListingModalContentMap = safeGet(state, 'model.promotedListingModalContentMap');
    const requiredAspectsContentMap = safeGet(state, 'model.addDetailsModalContentMap');
    let sioContentMap;
    let plContentMap;
    let raContentMap;

    if (promotedListingModalContentMap) {
        plContentMap = {
            closeLabel: safeGet(state, 'model.promotedListingModalContentMap.content.closeLabel.textSpans.0.text'),
            modalError: safeGet(state, 'model.promotedListingModalContentMap.content.modalError.textSpans.0.text'),
            modalTitle: safeGet(state, 'model.promotedListingModalContentMap.content.modalTitle.textSpans.0.text'),
            priorityLabel: safeGet(state, 'model.promotedListingModalContentMap.content.priorityLabel.textSpans.0.text'),
            spinnerLabel: safeGet(state, 'model.promotedListingModalContentMap.content.spinnerLabel.textSpans.0.text'),
            basePath: '/mys/api/'
        };
    }
    if (sioModalContentMap) {
        sioContentMap = {
            closeLabel: safeGet(state, 'model.sioModalContentMap.content.closeLabel.textSpans.0.text'),
            modalError: safeGet(state, 'model.sioModalContentMap.content.modalError.textSpans.0.text'),
            modalTitle: safeGet(state, 'model.sioModalContentMap.content.modalTitle.textSpans.0.text'),
            priorityLabel: safeGet(state, 'model.sioModalContentMap.content.priorityLabel.textSpans.0.text'),
            spinnerLabel: safeGet(state, 'model.sioModalContentMap.content.spinnerLabel.textSpans.0.text')
        };
    }
    if (requiredAspectsContentMap) {
        raContentMap = {
            busyLabel: safeGet(state, 'busyLabel'),
            closeLabel: safeGet(state, 'model.addDetailsModalContentMap.content.closeLabel.textSpans.0.text'),
            errorMessage: safeGet(state, 'model.addDetailsModalContentMap.content.modalError.textSpans.0.text'),
            title: safeGet(state, 'model.addDetailsModalContentMap.content.modalTitle.textSpans.0.text'),
            successMessage: safeGet(state, 'model.addDetailsModalContentMap.content.successMessage')
        };
    }
    return {
        items: safeGet(state, 'model.listings'),
        title: safeGet(state, 'model.title'),
        pagination: safeGet(state, 'model.pagination'),
        showEmptyScreen: safeGet(state, 'model._type') === 'MyeBaySellingEmptyStateModule',
        startListingLink: safeGet(state, 'model.startListingLink'),
        sioContentMap: sioContentMap,
        plContentMap: plContentMap,
        raContentMap: raContentMap
    };
}

module.exports = {
    getModelData
};
