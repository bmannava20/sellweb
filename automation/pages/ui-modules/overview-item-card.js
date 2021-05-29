/* globals browser */
'use strict';
const BaseComponent = require('./BaseComponent');

// interface for meui-items
module.exports = class ItemCard extends BaseComponent {
    constructor(selector) {
        super(selector);
        this.itemTitleLink = new BaseComponent(`${selector} .item-title a`);
        this.itemStatus = new BaseComponent(`${selector} .stats`);
    }

    get itemTitle() {
        return browser.getText(this.itemTitleLink.selector);
    }

    get itemTitleURL() {
        return $(this.itemTitleLink.selector).getAttribute('href');
    }

    // Item end date text in relist it
    get itemEndDateText() {
        return browser.getText(this.itemStatus.selector)[1];
    }

    // Item view/bids/watches in relist it
    get itemViewCntText() {
        return browser.getText(this.itemStatus.selector)[0];
    }
};
