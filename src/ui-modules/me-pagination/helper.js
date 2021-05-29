'use strict';
const safeGet = require('just-safe-get');


function paginationData(input) {
    const pagination = input.model;
    const paginationClass = input.class;

    const previousPage = safeGet(pagination, 'previous');
    const previousPageAccessibilityText = safeGet(pagination, 'previous.accessibilityText');
    const previousPageURL = safeGet(pagination, 'previous.action.URL');
    const previousPageDisabled = !previousPageURL ? 'disabled' : false;

    const nextPage = safeGet(pagination, 'next');
    const nextPageAccessibilityText = safeGet(pagination, 'next.accessibilityText');
    const nextPageURL = safeGet(pagination, 'next.action.URL');
    const nextPageDisabled = !nextPageURL ? 'disabled' : false;

    const pages = safeGet(pagination, 'pages');
    const shouldRenderComponent = (pages && pages.length);
    const dataAction = 'pagination';
    let currPageAccessibilityText = '';
    if (pages && pages.length) {
        for (let i = 0; i < pages.length; i++) {
            if (Boolean(safeGet(pages[i], 'selected'))) {
                currPageAccessibilityText = safeGet(pages[i], 'accessibilityText');
                break;
            }
        }
    }
    return {
        shouldRenderComponent,
        paginationClass,
        previousPage,
        previousPageAccessibilityText,
        previousPageURL,
        previousPageDisabled,
        nextPage,
        nextPageAccessibilityText,
        nextPageURL,
        nextPageDisabled,
        pages,
        dataAction,
        currPageAccessibilityText
    };
}

function getModelData(input) {
    const paginationDetails = paginationData(input);
    const itemPerPageOptions = safeGet(input, 'model.itemsPerPage.options');
    const itemPerPageText = safeGet(input, 'model.itemsPerPage.label.textSpans');
    const shouldRenderComponent = paginationDetails.shouldRenderComponent || (itemPerPageOptions && itemPerPageOptions.length);

    return {
        shouldRenderComponent,
        paginationClass: paginationDetails.paginationClass,
        previousPage: paginationDetails.previousPage,
        previousPageAccessibilityText: paginationDetails.previousPageAccessibilityText,
        previousPageURL: paginationDetails.previousPageURL,
        previousPageDisabled: paginationDetails.previousPageDisabled,
        nextPage: paginationDetails.nextPage,
        nextPageAccessibilityText: paginationDetails.nextPageAccessibilityText,
        nextPageURL: paginationDetails.nextPageURL,
        nextPageDisabled: paginationDetails.nextPageDisabled,
        pages: paginationDetails.pages,
        itemPerPageOptions,
        itemPerPageText,
        dataAction: paginationDetails.dataAction,
        currPageAccessibilityText: paginationDetails.currPageAccessibilityText
    };
}

function getMobileModelData(input) {
    return paginationData(input);
}


module.exports = {
    getModelData,
    getMobileModelData
};
