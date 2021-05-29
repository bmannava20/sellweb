'use strict';
const constants = require('../../../../utils/helpers/constants');
const safeGet = require('just-safe-get');

function getModelData(state) {
    return {
        items: safeGet(state, 'model.listings'),
        title: safeGet(state, 'model.title'),
        pagination: safeGet(state, 'model.pagination'),
        addNoteContentMap: safeGet(state, 'model.addEditNoteContentMap.content'),
        spaCommand: constants.SPA_COMMAND.SCHEDULED,
        showEmptyScreen: safeGet(state, 'model._type') === 'MyeBaySellingEmptyStateModule'
    };
}

module.exports = {
    getModelData
};
