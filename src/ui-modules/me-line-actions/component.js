'use strict';

const safeGet = require('just-safe-get');
const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');

const emitPulsarEvent = function(action, isLink) {
    if (!action) {
        return;
    }
    const trackingList = action.trackingList;
    trackingHelper.emitPulsarTracking(trackingList, isLink);
};

module.exports = class {
    onMenuSelect(event) {
        this.emit('lineActionSelect', {
            menuButton: this,
            target: event.el,
            eventData: this.input.data
        });
        const trackingObj = safeGet(this, `input.options.${event.index}.label.action`) || safeGet(this, `input.options.${event.index}.action`);
        // const isLink = !(event.el.nodeName && event.el.nodeName.toLowerCase() === 'button');
        emitPulsarEvent(trackingObj, true);
    }
    setLineActionButtonFocus() {
        return this.getLineActionButton().focus();
    }
    getLineActionButton() {
        return this.getEl().querySelector('.fake-menu-button__button');
    }
};
