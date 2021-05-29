'use strict';
const safeGet = require('just-safe-get');
const constants = require('../../../../utils/helpers/constants');

function getModel(input) {
    const unsoldModel = safeGet(input, 'model');
    let emptyMessage = safeGet(unsoldModel, 'emptyMessage.text');
    const items = safeGet(unsoldModel, 'lineItems');
    const paginationModel = safeGet(unsoldModel, 'pagination');
    const spaCommand = constants.SPA_COMMAND.UNSOLD;
    const addNoteContentMap = safeGet(unsoldModel, 'addEditNoteContentMap.content');
    const bulkOperation = getBulkOperationModel(unsoldModel);

    // TODO: Remove this when unsoldSvc is migrated to new exp.
    if (emptyMessage) {
        emptyMessage = {
            message: {
                textSpans: [{
                    text: emptyMessage
                }]
            }
        };
    }

    return {
        emptyMessage,
        items,
        paginationModel,
        addNoteContentMap,
        spaCommand,
        bulkOperation
    };
}

function getBulkOperationConfirmModel(input) {
    const contentMap = safeGet(input, 'deleteConfirmationMap.content');
    const deleteTitle = safeGet(contentMap, 'deleteMultiTitle');
    const deleteText = safeGet(contentMap, 'deleteMultiMessage');
    const confirmDelete = safeGet(contentMap, 'deleteConfirmButton.textSpans.0.text');
    const deleteCancel = safeGet(contentMap, 'deleteCancelButton.textSpans.0.text');
    const closeButtonText = safeGet(contentMap, 'closeButton.textSpans.0.accessibilityText');

    return {
        title: deleteTitle,
        content: deleteText,
        close: {
            accessibilityText: closeButtonText
        },
        confirm: {
            text: confirmDelete
        },
        cancel: {
            text: deleteCancel
        }
    };
}

function getBulkOperationModel(input) {
    const items = safeGet(input, 'listings');
    const itemCount = items ? items.length : 0;
    const deleteBtnText = safeGet(input, 'bulkDeleteAction.textSpans.1.text');
    const selectAllItems = safeGet(input, 'bulkDeleteAction.textSpans.0.text');
    const deleteErrorMessageText = safeGet(input, 'deleteErrorMessage.text');

    const bulkDeleteAction = {
        selectAllText: {
            textSpans: [
                {
                    text: selectAllItems
                }
            ]
        },
        operations: [
            {
                action: {
                    text: deleteBtnText
                },
                confirmationContent: getBulkOperationConfirmModel(input)

            }
        ]
    };

    if (deleteErrorMessageText) {
        bulkDeleteAction.operations[0].message = {
            title: {
                textSpans: [
                    {
                        text: deleteErrorMessageText
                    }
                ]
            }
        };
    }

    return {
        bulkDeleteAction,
        loadConfirmationDialog: itemCount > 0
    };
}

module.exports = {
    getModel
};
