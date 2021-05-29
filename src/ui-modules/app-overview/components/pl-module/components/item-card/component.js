'use strict';
const safeGet = require('just-safe-get');
const trackingHelper = require('../../../../../../utils/tracking-utils/pulsar-helper');

module.exports = class {
    onInput(input) {
        this.state = {
            model: input,
            noticeModel: {
                showNotice: false
            }
        };
    }
    onButtonClick(trackingList, data) {
        // track continue button click
        trackingHelper.emitPulsarTracking(trackingList, true);

        const el = data.originalEvent.target;
        const itemId = el.getAttribute('data-listing-id');
        this.emit('process-pl', {
            itemId,
            targetItemCardWidget: this
        });
    }
    showItemCardNotice(data) {
        const noticeModel = data.plSuccess || data.plError;
        const noticeStatus = data.plSuccess ? 'confirmation' : '';
        const noticeClass = data.plSuccess ? 'pl-item__confirmation' : '';
        if (safeGet(noticeModel, 'textSpans')) {
            this.setState('noticeModel', {
                showNotice: true,
                status: noticeStatus,
                class: noticeClass,
                priorityLabel: safeGet(noticeModel, 'accessibilityText') || '',
                message: safeGet(noticeModel, 'textSpans') || ''
            });
            // emit event to update module
            if (data.plSuccess) {
                setTimeout(() => {
                    this.setState('noticeModel', { showNotice: false });
                    this.emit('module-update');
                }, 2000);
            }
        }
    }
};
