'use strict';
const safeGet = require('just-safe-get');

function getModel(input) {
    const userNote = safeGet(input, 'model.note.textSpans.0.text');
    const userNoteLabel = safeGet(input, 'model.label.textSpans.0.text');
    const editButtonTxt = safeGet(input, 'contentMap.editButton.textSpans.0.text') || safeGet(input, 'model.edit.textSpans.0.text');
    const editButtonAccTxt = safeGet(input, 'contentMap.editButton.textSpans.0.accessibilityText') || safeGet(input, 'model.edit.textSpans.0.text');
    return {
        userNote,
        editButtonTxt,
        editButtonAccTxt,
        userNoteLabel
    };
}
module.exports = {
    getModel
};
