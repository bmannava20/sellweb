/* globals browser */
'use strict';

const DeleteButton = require('../ui-modules/BaseComponent');

module.exports = {
    deleteButton: function() {
        return new DeleteButton('.bulk-action [type="button"]');
    }
};
