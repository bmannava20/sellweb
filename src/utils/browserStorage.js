'use strict';

const getItem = function(key) {
    try {
        if (sessionStorage in window) {
            JSON.parse(sessionStorage(key));
        }
        /* eslint-disable */
    } catch (e) { }
    /* eslint-disable */
};

const setItem = function (key, value) {
    try {
        if (sessionStorage in window) {
            sessionStorage(key, JSON.stringify(value));
        }
        /* eslint-disable */
    } catch (e) { }
    /* eslint-disable */
};

module.exports.getItem = getItem;
module.exports.setItem = setItem;
