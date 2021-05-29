'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    const selectAllText = safeGet(input, 'model.selectAllText.textSpans');
    const deleteText = safeGet(input, 'model.operations.0.action.text') || safeGet(input, 'model.deleteBtnText.textSpans.0.text');
    const deleteOperations = safeGet(input, 'model.operations.0') || safeGet(input, 'model.confirmationContentMap');
    const errorContentText = safeGet(input, 'model.operations.0.message.title.textSpans.0.text') || safeGet(input, 'model.errorContentText.textSpans.0.text');
    return {
        selectAllText,
        deleteText,
        deleteOperations,
        errorContentText
    };
}

module.exports = {
    getModelData
};
