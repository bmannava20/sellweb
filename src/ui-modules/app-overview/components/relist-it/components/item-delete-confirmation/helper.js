'use strict';
const safeGet = require('just-safe-get');

function getData(input) {
    const deleteContent = safeGet(input, 'model.content.deleteMessage.textSpans.0.text');
    const deleteBtn = safeGet(input, 'model.content.deleteButton.textSpans.0.text');
    const deleteCancel = safeGet(input, 'model.content.cancel.textSpans.0.text');
    const deleteFailed = safeGet(input, 'model.content.deleteFailed.textSpans.0.text');
    const tryAgain = safeGet(input, 'model.content.tryAgain.textSpans.0.text');
    const isShowDeletePanel = safeGet(input, 'isShowDeletePanel');
    const listingId = safeGet(input, 'listingId');
    const content = safeGet(input, 'isShowRetryPanel') ? deleteFailed : deleteContent;
    const btn = isShowDeletePanel ? deleteBtn : tryAgain;
    const blueText = isShowDeletePanel ? 'normal' : 'is-try-again';

    return {
        listingId,
        content,
        deleteCancel,
        btn,
        blueText
    };
}
module.exports = {
    getData
};
