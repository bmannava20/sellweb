'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/model');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Given me-confirmation component is rendered with mock data', () => {
    describe('and cancel button is clicked', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockData);
            root = document.querySelector('.confirmation-modal-wrapper');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('disappear on canceled', () => {
            const handleOnClose = sinon.spy(widget, 'onCloseModal');
            root.querySelector('.btn--secondary').click();
            expect(handleOnClose.calledOnce).to.equal(true);
        });
    });

    describe('and confirm button is clicked', () => {
        let spy;
        let widget;
        beforeEach(() => {
            widget = buildWidget(mockData);
            spy = sinon.spy();
            widget.on('confirm', spy);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('disapper on confirm', () => {
            widget.emit('confirm');
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
