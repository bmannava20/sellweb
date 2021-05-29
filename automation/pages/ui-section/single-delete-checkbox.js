/* globals browser */
'use strict';

const CheckBox = require('../ui-modules/CheckBox');

module.exports = {
    checkBox: function(itemId) {
        return new CheckBox(`div[qa-id="draft-item-${itemId}"]`);
    }
};
