'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    // work around for Unsold page to get filter options from selections
    const filterOptions = safeGet(input, 'model.options') || safeGet(input, 'model.selections');
    let selectedFilterIndex;
    if (filterOptions) {
        for (let i = 0; i < filterOptions.length; i++) {
            if (Boolean(safeGet(filterOptions[i], 'selected'))) {
                selectedFilterIndex = i;
                break;
            }
        }
    }
    const prevLabel = safeGet(input, 'model.controls.previous.accessibilityText');
    const nextLabel = safeGet(input, 'model.controls.next.accessibilityText');
    // work around for Unsold page to get paramName "container_filter" from model.paramname
    const paramName = safeGet(input, 'model.paramName');
    return {
        filterOptions,
        prevLabel,
        nextLabel,
        selectedFilterIndex,
        paramName
    };
}

module.exports = {
    getModelData
};
