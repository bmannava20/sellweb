'use strict';
const browserStorage = require('../../utils/browserStorage');

module.exports = {
    setBrowserHistory: (data, ajaxUrl, reFreshUrl, replace) => {
        const method = replace ? window.history.replaceState : window.history.pushState;
        try {
            method.call(window.history, {
                model: data,
                url: ajaxUrl
            }, null, reFreshUrl);
        } catch (err) {
            console.error(err);
            method.call(window.history, {
                sStorage: { 'sKey': 'sKey' },
                url: ajaxUrl
            }, null, reFreshUrl);

            if (err.name === 'NS_ERROR_ILLEGAL_VALUE') {
                browserStorage.setItem('sKey', data);
            }
        }
    }
};
