'use strict';

const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;
const modelHelper = require('./helper');
module.exports = class {
    onCreate(input) {
        this.focusElOnDialogClose = null;
        this.state = modelHelper.getModelData(input);
    }

    showModal(el) {
        this.focusElOnDialogClose = el;
        this.state.showModal = true;
    }

    close() {
        this.state.showModal = false;
        if (this.focusElOnDialogClose) {
            this.focusElOnDialogClose.focus();
        }
    }

    updatePrefs() {
        const dataObject = {
            [this.state.ajax.preferenceId]: {
                [this.state.ajax.preferenceKey]: true
            }
        };
        fetch(
            `${this.state.ajax.prefixUrl}/${this.state.ajax.preferenceUrl}`,
            dataObject,
            'POST')
            .then(() => {
                if (this.state.ajax.classicLink) {
                    window.location.href = this.state.ajax.classicLink;
                }
                if (this.state.ajax.allSellingLink) {
                    window.location.href = this.state.ajax.allSellingLink;
                }
            })
            .catch((err) => {
                console.error(err);
                window.location.href = this.state.ajax.classicLink;
            });
    }
};
