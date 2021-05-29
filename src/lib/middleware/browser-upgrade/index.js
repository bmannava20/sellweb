'use strict';

/**
* check if the request is from IE versions less than 10, then redirect to browser upgrade page
*/
module.exports = () => (req, res, next) => {
    if (req.url.startsWith('/mys/browser_upgrade')
        || req.url.includes('warmup=true')) {
        return next();
    }

    // check if IE 10 or below and if yes, redirect to unsupported page
    const browserName = req.deviceInfo && req.deviceInfo.browser;
    const browserVersion = parseInt(req.deviceInfo && req.deviceInfo.browserVersion, 10);
    if (browserName === 'Internet Explorer' && browserVersion <= 10) {
        return res.redirect('/mys/browser_upgrade');
    }
    return next();
};
