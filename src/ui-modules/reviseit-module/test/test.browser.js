'use strict';

const expect = require('chai').expect;
const mockData = require('../mock-data/model.json');
const renderer = require('..');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Given empty data to Revise it module', () => {
    let widget;
    let listings;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.emptyData });
        listings = document.querySelector('.reviseit-module');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should be empty because data is empty', () => {
        expect(listings).to.be.null;
    });
});

describe('Given full data to Revise it module', () => {
    let widget;
    let listings;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.modules.reviseItModule });
        listings = document.querySelector('.reviseit-module');
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render revise it module', () => {
        expect(listings).to.be.not.null;
        expect(listings.querySelectorAll('.meui-item-tile')).to.have.lengthOf(3);
    });
});
