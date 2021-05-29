'use strict';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
module.exports = {
    fetch: function(url, data, method, append = false) {
        const srt = window.eBay ? window.eBay.csrfTokenModule : '';
        method = method || 'GET';
        const request = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'srt': srt,
                'pragma': 'no-cache',
                'cache': 'no-store',
                'cache-control': 'no-store'
            },
            credentials: 'same-origin'
        };

        // cache busting.
        if (method === 'GET') {
            const bustCache = `${append ? '&' : '?' }_=${new Date().getTime()}`;
            url = url + bustCache;
        }

        if (data && method !== 'GET') {
            request.body = JSON.stringify(data);
        }

        return fetch(url, request)
            .then(handleErrors)
            .then(response => response.json());
    }
};
