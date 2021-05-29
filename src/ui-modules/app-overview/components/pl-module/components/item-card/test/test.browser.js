'use strict';

const chai = require('chai');
const expect = chai.expect;
const dWebItemList = require('../index.marko');
const mockData = require('../../../mock-data/mock-data');

function buildWidget(data) {
    return (dWebItemList)
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('dWeb pl item card', () => {
    let widget;
    let itemCard;

    beforeEach(() => {
        widget = buildWidget({ item: mockData.fullData.lineItems[0] });
        itemCard = document.querySelector('.pl-item');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should render pl item card', () => {
        expect(itemCard).to.be.not.null;
        expect(itemCard.querySelector('.item-title')).to.not.be.null;
        expect(itemCard.querySelector('.stats')).to.not.be.null;
        expect(itemCard.querySelector('.item-price')).to.not.be.null;
    });

    it('should show the primary button', () => {
        const el = itemCard.querySelector('.pl-item__button');
        expect(el).to.not.be.null;
        expect(el.innerText).to.have.string('Promote listing');
    });
});
