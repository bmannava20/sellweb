'use strict';

/**
 ** Renders a link with NAV & NAVSRC tracking based on action property
 **/
const safeGet = require('just-safe-get');
const trackingHelper = require('../../utils/tracking-utils/pulsar-helper');


module.exports = class {
    onCreate(input) {
        this.state = input;
    }
    onInput(input) {
        this.state = input;
    }
    eventDelegate(e) {
        this.emitPulsarEvent();
        this.navLinkClickAPI(e);
    }

    emitPulsarEvent() {
        const trackingList = safeGet(this.state, 'action.trackingList');
        trackingHelper.emitPulsarTracking(trackingList, true);
    }
    navLinkClickAPI(e) {
        const self = this;
        self.emit('navLinkClickAPI', {
            'data': {
                'meuiNavlinkEvent': e,
                'meuiNavlinkState': self.state
            }
        });
    }
};
