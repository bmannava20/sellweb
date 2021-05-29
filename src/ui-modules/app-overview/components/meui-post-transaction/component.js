'use strict';

const constants = require('../../../../utils/helpers/constants');
const safeGet = require('just-safe-get');

function getData(input) {
    const model = safeGet(input, 'model') || {};
    const sectionId = safeGet(model, '_type');
    model.styleMapWithDefault = constants.STYLE_MAPS.WITH_DEFAULT;
    model.styleMap = constants.STYLE_MAPS.NO_DEFAULT.styleMap;
    model.isShipItModule = (sectionId === 'ShipItViewModel');
    model.sectionId = sectionId ? sectionId.replace('ViewModel', '') : '';
    return model;
}

module.exports = class {
    onCreate(input) {
        this.state = getData(input);
    }
    onShipItUpdate(data) {
        this.state = getData({ model: data.data.shipItModule });
    }
};
