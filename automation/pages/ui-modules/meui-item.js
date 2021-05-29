/* globals Checkbox */
'use strict';
const BaseComponent = require('./BaseComponent');

// interface for meui-items
module.exports = class MeuiItem extends BaseComponent {
    constructor(selector) {
        super(selector);
        this.checkbox = new Checkbox(`${selector} .item-checkbox`);
    }
};
