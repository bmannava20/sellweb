'use strict';

const safeGet = require('just-safe-get');

function getModelData(model) {
    const data = {
        title: safeGet(model, 'title'),
        content: safeGet(model, 'content'),
        footers: safeGet(model, 'footer')
    };

    return data;
}

module.exports = {
    getModelData
};
