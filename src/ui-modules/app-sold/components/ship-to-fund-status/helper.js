'use strict';

function getModelData(input) {
    // The first textSpan is the icon info, hence getting the rest of the textspans
    const textSpans = [];
    (input.model.textSpans || []).slice(1).forEach(textSpan => textSpans.push(textSpan));

    return {
        textSpans
    };
}

module.exports = {
    getModelData
};
