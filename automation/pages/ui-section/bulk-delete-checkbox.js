/* globals browser */
'use strict';

const CheckBox = require('../ui-modules/CheckBox');

module.exports = {
    checkBox: function() {
        return new CheckBox(`.bulk-action`);
    }
};
