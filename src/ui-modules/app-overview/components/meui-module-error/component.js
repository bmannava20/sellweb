'use strict';

module.exports = class {
    toggleState(message) {
        if (message) {
            this.getEl('content').innerText = message;
        }
        this.el.classList.add('active');
    }
};
