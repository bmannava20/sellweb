'use strict';
const safeGet = require('just-safe-get');
const fetch = require('../../../../utils/helpers/fetch-wrapper').fetch;

function isMultipleOrder(order) {
    return order && order.displayTotalPrice;
}

function normalize(arr) {
    let list;
    if (Array.isArray(arr) && arr.length > 0) {
        list = [];

        arr.filter((order) => {
            const orderCard = {};
            if (isMultipleOrder(order)) {
                orderCard.header = order;
            }
            const items = [];
            if (Array.isArray(order.orderLineItems)) {
                order.orderLineItems.filter((item) => {
                    items.push(item);
                });
                orderCard.items = items;
                list.push(orderCard);
            }
        });
    }
    return list || arr;
}

module.exports = class {
    onCreate(input) {
        this.state = {
            items: normalize(safeGet(input, 'model.lineItems')),
            title: safeGet(input, 'model.title'),
            seeAll: safeGet(input, 'model.seeAll')
        };
    }
    onCloseShippingTipsModal() {
        if (this.lastFocusElement) this.lastFocusElement.setLineActionButtonFocus();
        this.lastFocusElement = null;
    }
    onOpenShippingTipsModal(event) {
        this.lastFocusElement = event && event.menuButton;
        const dialogWidget = this.getComponent('shippingTipsModal');
        dialogWidget.show();
    }
    updateAwaitingPaymentModule(callback) {
        const self = this;
        // show spinner only if there is not callback
        callback && typeof callback !== 'function' && self.getComponent('spinner').showSpinner();

        fetch('/mys/ajx/spa/OVERVIEW')
            .then(response => {
                self.getComponent('spinner').hideSpinner();
                if (response.msgType === '500') {
                    window.location.reload();
                    return;
                }
                // execute callback which hides the spinner for the await payments
                callback && typeof callback === 'function' && callback();

                // update ship module
                self.emit('updateShipModule', {
                    'data': {
                        'shipItModule': safeGet(response, 'modules.shipItModule')
                    }
                });

                // update await payment module
                self.setState({
                    items: normalize(safeGet(response, 'modules.awaitingPaymentModule.lineItems')),
                    title: safeGet(response, 'modules.awaitingPaymentModule.title'),
                    seeAll: safeGet(response, 'modules.awaitingPaymentModule.seeAll')
                });
            })
            .catch(err => {
                console.error(err);
                self.getComponent('spinner').hideSpinner();
            });
    }
};
