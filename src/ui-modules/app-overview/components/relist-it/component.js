'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    onCreate(input) {
        this.state = {
            items: safeGet(input, 'model.lineItems'),
            title: safeGet(input, 'model.title'),
            seeAll: safeGet(input, 'model.seeAll'),
            deleteConfirm: safeGet(input, 'model.deleteConfirmationMap'),
            isShowDeletePanel: false,
            isShowRetryPanel: false,
            isDeleting: false,
            itemPanelStates: []
        };
    }
    updateItemStates(model) {
        const itemWidget = this.getComponent(model.listingId);
        if (itemWidget) {
            const state = {
                isShowDeletePanel: itemWidget.state.isShowDeletePanel,
                isShowRetryPanel: itemWidget.state.isShowRetryPanel,
                isDeleting: itemWidget.state.isDeleting
            };
            this.state.itemPanelStates[model.listingId] = state;
        }
    }
};
