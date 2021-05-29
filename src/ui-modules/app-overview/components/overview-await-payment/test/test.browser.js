'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/data.json');

const buildWidget = (data) => template.
    renderSync(data).
    appendTo(document.body).
    getComponent();

describe('given overview-await-payment module', () => {
    describe('is rendered with admin ended item', () => {
        let widget;
        let rootEl;

        beforeEach(() => {
            widget = buildWidget({ model: mockData.adminEnded });
            rootEl = document.querySelector('.await-payment-wrapper');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should render only 1 order card', () => {
            expect(rootEl).to.be.not.null;
            expect(rootEl.querySelectorAll('.overview-await-payment-ordercard')).to.be.of.length(1);
        });
    });

    describe('has 6 orders', () => {
        let widget;
        let rootEl;

        beforeEach(() => {
            widget = buildWidget({ model: mockData.withSeeAll });
            rootEl = document.querySelector('.await-payment-wrapper');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should render 5 order cards', () => {
            expect(rootEl).to.be.not.null;
            expect(rootEl.querySelectorAll('.overview-await-payment-ordercard')).to.be.of.length(5);
        });

        it('should have a see all link', () => {
            expect(rootEl).to.be.not.null;
            expect(widget.getComponent('see-all')).to.exist;
        });
    });
});

