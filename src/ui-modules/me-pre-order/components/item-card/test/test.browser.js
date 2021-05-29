'use strict';

const chai = require('chai');
const expect = chai.expect;
const dWebItemList = require('../index.marko');
const mWebItemList = require('../index[mobile].marko');
const mockData = require('../../../mock-data/mock-data');

function buildWidget(data, deviceType) {
    return (!deviceType ? dWebItemList : mWebItemList)
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('dWeb sioModule item card', () => {
    let widget;
    let itemCard;

    beforeEach(() => {
        widget = buildWidget({ item: mockData.sioModule.lineItems[0] });
        itemCard = document.querySelector('.pre-order-item');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should render sio item card', () => {
        expect(itemCard).to.be.not.null;
        expect(itemCard.querySelector('.item-title')).to.not.be.null;
        expect(itemCard.querySelector('.stats')).to.not.be.null;
        expect(itemCard.querySelector('.item-price')).to.not.be.null;
        expect(itemCard.querySelector('.offer-status').children.length > 0).to.be.true;
    });

    it('should show the primary line action ', () => {
        const el = itemCard.querySelector('.primary-actions button');
        expect(el).to.not.be.null;
        expect(el.innerText).to.have.string('Send offer');
    });
});

describe('mWeb sioModule item card', () => {
    let widget;
    let itemCard;

    beforeEach(() => {
        widget = buildWidget({ item: mockData.sioModule.lineItems[0] }, 'mWeb');
        itemCard = document.querySelector('.pre-order-insights');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should render sio item card', () => {
        expect(itemCard).to.be.not.null;
        expect(itemCard.querySelector('.item-title')).to.not.be.null;
        expect(itemCard.querySelector('.item__price')).to.not.be.null;
        expect(itemCard.querySelector('.item__time')).to.not.be.null;
    });

    it('should show the primary line action ', () => {
        const el = itemCard.querySelector('.item__actions button');
        expect(el).to.not.be.null;
        expect(el.innerText).to.have.string('Send offer');
    });
});
