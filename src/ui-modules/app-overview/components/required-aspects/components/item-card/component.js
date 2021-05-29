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
        const dataUrl = el.getAttribute('data-url');
        // Emit the event only if type is OPERATION
        if (safeGet(this.state, 'model.item.__me.lineActions.options.0.selections.0.label.action.type') === 'OPERATION') {
            this.emit('req-aspects', {
                dataUrl,
                targetItemCardWidget: this
            });
        }
    }
    showItemCardNotice(data) {
        const noticeModel = data.successMessage;
        const noticeStatus = data.successMessage ? 'confirmation' : '';
        const noticeClass = data.successMessage ? '__success' : '';
        if (safeGet(noticeModel, 'textSpans')) {
            this.setState('noticeModel', {
                showNotice: true,
                status: noticeStatus,
                class: `required-aspects${noticeClass}`,
                priorityLabel: safeGet(noticeModel, 'accessibilityText') || '',
                message: safeGet(noticeModel, 'textSpans') || ''
            });
            // emit event to update module
            if (data.successMessage) {
                setTimeout(() => {
                    this.setState('noticeModel', { showNotice: false });
                    this.emit('module-update');
                }, 2000);
            }
        }
    }
};
