'use strict';

function getBrowserInfo(req) {
    const browserName = req.deviceInfo && req.deviceInfo.browser;
    const browserVersion = parseInt(req.deviceInfo && req.deviceInfo.browserVersion, 10);
    return {
        browserName,
        browserVersion
    };
}
module.exports = {
    getBrowserInfo
};
