'use strict';
// const Cal = require('cal');
/**
* check if the request is from IE versions less than 10, then redirect to browser upgrade page
*/
module.exports = () => (req, res, next) => {
    if (!req.deviceInfo) return;

    const browserName = req.deviceInfo && req.deviceInfo.browser;
    const browserVersion = parseInt(req.deviceInfo && req.deviceInfo.browserVersion, 10);
    // console.info('polyfill', res.locals.flags);
    // skin-ds6 required by ebay-ui
    const flags = {
        'polyfill': (browserName === 'Internet Explorer' && browserVersion > 10) ||
            (browserName === 'Safari' && browserVersion < 10)
    };

    if (res && res.locals) {
        res.locals.flags = res.locals.flags || [];
        res.locals.flags = [...res.locals.flags,
            ...Object.keys(flags).filter(flag => flags[flag])];
    }
    // Cal.createEvent('middleware:polyfill', 'LassoFlags')
    //     .addData(`${res.locals.flags} browserName=${browserName} browserversion=${browserVersion}`)
    //     .complete(0);
    // need for debugging purpose
    // console.info('polyfill ====>', res.locals.flags, ' ', browserName, ' ', browserVersion);
    next();
};
