/* eslint-disable */
'use strict';
const http = require('http');

module.exports = {
    httpCall: (urlPath, port) => new Promise((resolve) => {
        http.get({
            host: 'localhost',
            port: port,
            path: urlPath
        }, () => {
            console.log(`Warmed up ${port} - ${urlPath}`);
            resolve();
        }).on('error', () => {
            console.log(`error warming up ${port} - ${urlPath}`);
            resolve();
        });
    })
};
