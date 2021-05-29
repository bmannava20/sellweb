/* globals browser */
'use strict';

const ConfirmationButton = require('../ui-modules/BaseComponent');

module.exports = {
    confirmationButton: function() {
        return new ConfirmationButton('.confirmation-dialog-container .confirmation-btn');
    }
};
