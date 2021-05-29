/* globals browser */
'use strict';
const BaseComponent = require('./BaseComponent');

// interface for meui-items
module.exports = class ItemCard extends BaseComponent {
    constructor(selector) {
        super(selector);
        this.itemImage = new BaseComponent(`${selector} .img-cell img`);
        this.itemImageLink = new BaseComponent(`${selector} .img-cell`);
        this.itemModifiedDate = new BaseComponent(`${selector} .item__time-left`);
        this.itemButton = new BaseComponent(`${selector} .item__btn-wrapper a`);
        this.itemTitleLink = new BaseComponent(`${selector} .item-title a`);
        this.itemStatus = new BaseComponent(`${selector} .stats`);
    }

    get itemTitle() {
        return browser.getText(this.itemTitleLink.selector);
    }

    get itemTitleURL() {
        return $(this.itemTitleLink.selector).getAttribute("href");
    }

    get getItemImage() {
        return browser.getAttribute('.meui-img-wrapper img', 'src');
    }

    get itemImageURL() {
        return $(this.itemImageLink.selector).getAttribute("href");
    }

    get getItemModifiedDate() {
        return browser.getText(this.itemModifiedDate.selector);
    }

    clickCTAButton() {
        this.itemButton.click();
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
