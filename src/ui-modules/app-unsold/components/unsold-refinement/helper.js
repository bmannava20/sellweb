'use strict';
const safeGet = require('just-safe-get');

function getBulkOperationConfirmModel(input) {
    const contentMap = safeGet(input, 'model.bulkDeleteConfirmationContentMap.content');
    const deleteTitle = input.multiItemSelected ? safeGet(contentMap, 'deleteMultiTitle') : safeGet(contentMap, 'deleteTitle');
    const deleteMessage = input.multiItemSelected ? safeGet(contentMap, 'deleteMultiMessage') : safeGet(contentMap, 'deleteMessage');
    const confirmDelete = safeGet(contentMap, 'deleteConfirmButton.textSpans.0.text');
    const deleteCancel = safeGet(contentMap, 'deleteCancelButton.textSpans.0.text');
    const closeButtonText = safeGet(contentMap, 'closeButton.textSpans.0.accessibilityText');

    return {
        confirmationContent: {
            title: deleteTitle,
            content: deleteMessage,
            close: {
                accessibilityText: closeButtonText
            },
            confirm: {
                text: confirmDelete
            },
            cancel: {
                text: deleteCancel
            }
        }
    };
}

function getModelData(input) {
    const moduleTitle = safeGet(input, 'model.moduleTitle.textSpans');
    const sortOptions = safeGet(input, 'model.sort');
    const filters = safeGet(input, 'model.filter');
    const cancelButton = safeGet(input, 'model.cancel');

    const bulkDeleteEditModel = {
        editText: safeGet(input, 'model.edit.textSpans'),
        cancelText: safeGet(input, 'model.bulkDeleteCancel.textSpans')
    };
    const bulkDelete = {
        selectAllText: safeGet(input, 'model.bulkDeleteSelectAll'),
        deleteBtnText: safeGet(input, 'model.bulkDeleteAction'),
        errorContentText: safeGet(input, 'model.bulkDeleteErrorMessage'),
        confirmationContentMap: getBulkOperationConfirmModel(input)
    };
    return {
        moduleTitle,
        sortOptions,
        filters,
        content: {
            cancelButton
        },
        bulkDelete,
        bulkDeleteEditModel
    };
}

module.exports = {
    getModelData
};
