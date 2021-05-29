'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    // work around for Unsold page to get filter options from selections
    const sortOptions = safeGet(input, 'model.options') || safeGet(input, 'model.selections');
    const sortTitle = safeGet(input, 'model.label.textSpans');
    const cancelButton = safeGet(input, 'content.cancelButton.textSpans');
    let selectedSortLabel;
    let selectedSortIndex;
    if (sortOptions) {
        for (let j = 0; j < sortOptions.length; j++) {
            if (Boolean(safeGet(sortOptions[j], 'selected'))) {
                selectedSortIndex = j;
                selectedSortLabel = safeGet(sortOptions[j], 'label.textSpans.0.text');
                break;
            }
        }
    }
    const menuType = 'radio';
    const isMenuReverse = true;
    const isMenuBorderless = true;
    const size = 'small';
    // work around for Unsold page to get paramName "container_sort" from model.paramname
    const paramName = safeGet(input, 'model.paramName');
    return {
        menuType,
        size,
        isMenuReverse,
        isMenuBorderless,
        sortOptions,
        sortTitle,
        selectedSortLabel,
        selectedSortIndex,
        paramName,
        cancelButton
    };
}

module.exports = {
    getModelData
};
