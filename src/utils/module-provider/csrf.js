'use strict';
const csrf = require('../meCsrfToken');

module.exports = (req) => {
    const data = {
        modulePromises: {
            csrfTokenModule: csrf.generateToken(req)
        }
    };
    return data;
};
