'use strict';
const safeGet = require('just-safe-get');

module.exports = class {
    processButtonClickOperation(data) {
        const el = data.target;
        const targetFunction = el.getAttribute('data-target-fn');

        if ((targetFunction && targetFunction.indexOf('upiCancel') >= 0)) {
            if (data.originalEvent) {
                typeof data.originalEvent.preventDefault === 'function' && data.originalEvent.preventDefault();
            }
            const payLoad = {
                params: safeGet(this, 'input.model.__me.itemAction.callToAction.action.params'),
                isSingleOrder: !safeGet(this, 'input.model.isMultiOrderMainHeader'),
                redirectUrl: safeGet(this, 'input.model.__me.itemAction.callToAction.action.URL'),
                delegateAppUpdate: 'soldPageUpdate',
                errorCallBack: () => {
                    this.getComponent('item-card-top-bar').destroy();
                }
            };
            this.getComponent('upi-sold').showCancelUPIModal(payLoad);
        }
    }
};
