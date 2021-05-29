'use strict';

const get = require('just-safe-get');
const constants = require('../../utils/helpers/constants');

module.exports = {
    getData: function(input) {
        const model = input || {};
        return {
            class: get(model, 'class', ''),
            text: get(model, 'model.textSpans'),
            styleMap: get(model, 'setDefault') === true ? constants.STYLE_MAPS.WITH_DEFAULT : constants.STYLE_MAPS.NO_DEFAULT
        };
    }
};
