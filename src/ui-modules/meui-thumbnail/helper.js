'use strict';
const safeGet = require('just-safe-get');

function getModelData(input) {
    return {
        altText: safeGet(input, 'altText.textSpans.0.text'),
        imageUrl: safeGet(input, 'image.URL'),
        action: safeGet(input, 'image.action'),
        sizeOption: safeGet(input, 'size')
    };
}

module.exports = {
    getModelData
};
