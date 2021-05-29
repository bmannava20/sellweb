'use strict';

const chai = require('chai');
const expect = chai.expect;
const itemCardRow = require('../index.marko');
const mockData = require('./fixtures/default');

function buildWidget(data) {
    return itemCardRow
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Sold list should show ', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget(mockData);
        root = document.querySelector('.sold-page__list');
    });
    afterEach(() => {
        widget && widget.destroy();
    });
    it('8 orders', () => {
        expect(root.querySelectorAll('.sold-itemcard').length).to.equal(8);
    });
    it('first order is multi item order', () => {
        const item1 = root.querySelectorAll('.sold-itemcard')[0];
        expect(item1.querySelector('.sold-multi-items-order')).to.be.not.undefined;
    });
    it('Multi item order, first item should show item action header', () => {
        const item1 = root.querySelectorAll('.sold-itemcard')[0];
        expect(item1.querySelectorAll('.sold-item--header')[1].querySelector(' .me-item-card-top-bar')).to.be.not.undefined;
    });
    it('first order should show ship to fund inline notice', () => {
        const item1 = root.querySelectorAll('.sold-itemcard')[0];
        expect(item1.querySelectorAll('.sold-item--header')[0].querySelector(' .ship-to-fund-status')).to.be.not.undefined;
    });
});
