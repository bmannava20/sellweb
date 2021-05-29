'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/data');
const mockWithShipDtls = require('../mock-data/data-shipping-details');
const renderer = require('../index.marko');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Buyer details widget', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.__me });
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render sold date if present', () => {
        const soldDateEl = document.getElementsByClassName('sold-date')[0];
        const soldDate = mockData.__me.soldDate.textSpans[0].text;
        expect(soldDate).to.not.be.undefined;
        expect(soldDateEl.innerText).to.equal(soldDate);
    });
});

describe('buyer details with shipping note', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget({ model: mockWithShipDtls.__me, isShipItModule: true });
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render shipping note if present', (done) => {
        const wrapperEl = document.getElementsByClassName('sub-text')[0];
        const shippingNote = mockWithShipDtls.__me.shippingDetails.shippingNote.textSpans.map(t => t.text).join('');
        expect(wrapperEl.innerText).to.equal(shippingNote);
        done();
    });
});
