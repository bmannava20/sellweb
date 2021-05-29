'use strict';

const safeGet = require('just-safe-get');
const queryString = require('query-string');

module.exports = class {
    showActivityError(e) {
        const toolTip = e.target.parentElement;
        toolTip.setAttribute('aria-expanded', (toolTip.getAttribute('aria-expanded') === 'false'));
        const toolTipMessage = toolTip.getElementsByClassName('tooltip-alert')[0];
        if (toolTipMessage.classList.contains('active')) {
            toolTipMessage.classList.remove('active');
            e.target.parentElement.setAttribute('aria-expanded', 'false');
        } else {
            toolTipMessage.classList.add('active');
            e.target.parentElement.setAttribute('aria-expanded', 'true');
        }
    }
    onNavLinkClickAPI(e) {
        const url = safeGet(e, 'data.meuiNavlinkState.action.URL');
        const type = safeGet(e, 'data.meuiNavlinkState.action.type');
        const name = safeGet(e, 'data.meuiNavlinkState.action.name');
        let params = safeGet(e, 'data.meuiNavlinkState.action.params');

        if (params) {
            params = `/${queryString.stringify(params)}`;
        }
        const self = this;
        if (type === 'OPERATION') {
            e.data.meuiNavlinkEvent.preventDefault();
            self.emit('appUpdate', {
                'url': url,
                'type': type,
                'name': name,
                'params': params
            });
        }
    }
};
