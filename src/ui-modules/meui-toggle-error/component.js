'use strict';

const safeGet = require('just-safe-get');

module.exports = {

    onMount: function() {
        const errorMessage = safeGet(this, 'input.errorMessage');
        const errorEl = document.getElementsByClassName('meui-module-error')[0];
        const thisWidget = this.getEl(errorEl);
        if (!thisWidget) {
            return;
        }
        thisWidget.toggleState(errorMessage);
    }
};
