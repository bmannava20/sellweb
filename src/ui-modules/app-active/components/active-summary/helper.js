'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const moduleTitle = safeGet(input, 'model.moduleTitle.textSpans');
    const sortOptions = safeGet(input, 'model.sort');
    const cancelButton = safeGet(input, 'model.cancel');
    const filters = safeGet(input, 'model.filter');
    return {
        moduleTitle,
        sortOptions,
        filters,
        content: {
            cancelButton
        }
    };
}

module.exports = {
    getModelData
};
