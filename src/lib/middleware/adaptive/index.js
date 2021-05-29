'use strict';
const arc = require('arc-server');

module.exports = function() {
    return function(req, res, next) {
        const flags = {
            'mobile': req.deviceInfo && (req.deviceInfo.isSmall && !req.deviceInfo.isFSOM),
            'skin-ds6': true
        };
        arc.setFlagsForContext(flags, () => {
            res.locals.flags = res.locals.flags || [];
            // eslint-disable-next-line no-console
            console.info('Arc flags: ', flags);
            if (res && res.locals) {
                res.locals.flags = [...res.locals.flags, ...Object.keys(flags).filter(flag => flags[flag])];
                // console.log(`[Url: ${req.originalUrl}, ug: ${req.headers['user-agent']}, lasso-flags: ${res.locals.flags}`);
            }
            //  console.info('adapitive', res.locals.flags);
            next();
        });
    };
};
