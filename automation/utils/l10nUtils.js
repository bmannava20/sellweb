/* globals browser */
'use strict';

module.exports = {
    formatedDateMMMDD(timestamp) {
        const date = new Date(timestamp);

        const options = { day: 'numeric', month: 'short' };
        // options.timeZone = 'Europe/Berlin';
        return date.toLocaleDateString('en-US', options);
    }
};
