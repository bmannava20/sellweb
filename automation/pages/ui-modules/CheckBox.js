/* globals browser */
'use strict';

// interfaces for checkbox
const BaseComponent = require('./BaseComponent');

module.exports = class Checkbox extends BaseComponent {
    constructor(selector) {
        super(selector);
        this.input = `${selector} input[type=checkbox]`;
    }

    get checked() {
        return (browser.getAttribute(this.input, 'checked') === 'true');
    }

    // checks if element is enabled or disabled
    // returns true if not disabled
    get enabled() {
        return browser.isEnabled(this.input);
    }
    // performs click action on the element
    click() {
        browser.click(this.input);
    }
};
