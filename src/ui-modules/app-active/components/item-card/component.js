'use strict';
const trackingHelper = require('../../../../utils/tracking-utils/pulsar-helper');
const safeGet = require('just-safe-get');

module.exports = class {
    onInput() {
        this.state = {
            noticeModel: {
                showNotice: false
            }
        };
    }
    processButtonClickOperation(data) {
        const el = data.target;
        const targetFunction = el.getAttribute('data-target-fn');
        const dataUrl = el.getAttribute('data-url') || el.getAttribute('href');
        const itemId = this.input.item.listingId;
        this.emit('item-callto-action', {
            itemId,
            dataUrl,
            targetFunction,
            targetItemCardWidget: this
        });
    }
    onSecondaryBtnClick(trackingList) {
        trackingHelper.emitPulsarTracking(trackingList.trackingList, true);
    }
    showItemCardNotice(data) {
        const noticeModel = data.success || data.error;
        const noticeStatus = data.success ? 'confirmation' : '';
        const noticeClass = data.success ? 'item__success-notice' : '';
        if (safeGet(noticeModel, 'textSpans')) {
            this.setState('noticeModel', {
                showNotice: true,
                status: noticeStatus,
                class: noticeClass,
                priorityLabel: safeGet(noticeModel, 'accessibilityText') || '',
                message: safeGet(noticeModel, 'textSpans') || ''
            });
            // emit event to update active app
            if (data.success) {
                setTimeout(() => {
                    this.setState('noticeModel', { showNotice: false });
                    this.emit('activePageUpdate');
                }, 2000);
            }
        }
    }
};
