'use strict';

module.exports = class {
    onCreate(input) {
        this.state = {
            'model': input && input.model,
            'a11yIndicator': input && input.a11yIndicator,
            'shippingTips': input.shippingTips
        };
    }

    onLineActionSelect(event) {
        this.emitEvent('lineActionSelect', event.target);
        const eleAttr = event.target.dataset;
        if (eleAttr && eleAttr.name === 'tipsForShipping') {
            this.getComponent('tipModule').show();
        }
    }
    emitEvent(eventName, eventTarget) {
        this.emit(eventName, {
            'target': eventTarget,
            'data': this.state.model
        });
    }
    onButtonClick(event) {
        const targetFunc = event.originalEvent.target.getAttribute('data-target-fn');
        switch (targetFunc) {
            case 'tipsForShipping':
                this.getComponent('tipModule').show();
                break;
            case 'SIO_SEND_OFFER':
                this.emitEvent('button-click', event.originalEvent.target);
                break;
            default:
                break;
        }
    }
};
