'use strict';
const safeGet = require('just-safe-get');
const queryString = require('query-string');

module.exports = class {
    onNavLinkClickAPI(e) {
        const url = safeGet(e, 'data.meuiNavlinkState.action.URL');
        const type = safeGet(e, 'data.meuiNavlinkState.action.type');
        const name = safeGet(e, 'data.meuiNavlinkState.action.name');
        let params = safeGet(e, 'data.meuiNavlinkState.action.params');

        if (params) {
            params = `/${ queryString.stringify(params)}`;
        }

        if (type === 'OPERATION') {
            e.data.meuiNavlinkEvent.preventDefault();
            this.emit('appUpdate', {
                'url': url,
                'type': type,
                'name': name,
                'params': params
            });
        }
    }
};
