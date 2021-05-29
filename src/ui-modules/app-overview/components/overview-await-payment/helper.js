'use strict';
const safeGet = require('just-safe-get');


function createUpiContentMap(input) {
    return {
        singleItem: {
            modalContentMap: safeGet(input, 'model.upiCancelAndRelist'),
            errorMessage: safeGet(input, 'model.upiSuccessAndFailureContentMap.itemFailure'),
            successMessage: safeGet(input, 'model.upiSuccessAndFailureContentMap.orderSuccess'),
            spinnerBusyLabel: safeGet(input, 'myebayPageContent.busyLabel')
        },
        multiItem: {
            modalContentMap: safeGet(input, 'model.upiCancelOrder'),
            errorMessage: safeGet(input, 'model.upiSuccessAndFailureContentMap.orderFailure'),
            successMessage: safeGet(input, 'model.upiSuccessAndFailureContentMap.orderSuccess'),
            spinnerBusyLabel: safeGet(input, 'myebayPageContent.busyLabel')
        }
    };
}

module.exports = {
    createUpiContentMap: createUpiContentMap
};
