'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Given me-checkbox component is rendered', () => {
    const listingId = 'listing-id-123';
    describe('with mock data', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget({
                value: listingId
            });
            root = document.querySelector('.item__checkbox-wrapper');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show render checkbox & label on the page', () => {
            expect(root.querySelector('.item__checkbox')).to.be.not.null;
            expect(root.querySelector('label')).to.be.not.null;
        });
    });

    describe('is checked', () => {
        let spy;
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget({
                value: listingId
            });
            root = document.querySelector('.item__checkbox-wrapper');
            spy = sinon.spy();
            widget.on('checkbox-change', spy);
            root.querySelector('input[type="checkbox"]').click();
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('emit the event with the checkbox value', () => {
            expect(spy.calledOnce).to.equal(true);
            expect(spy.getCall(0).args[0].value).to.equal(listingId);
        });
    });
});
