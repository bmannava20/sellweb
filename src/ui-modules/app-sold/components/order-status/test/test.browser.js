'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const orderStatus = require('./fixtures/order-status.json');
const orderStatusWithIcon = require('./fixtures/order-status-with-icon.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('when order-status', () => {
    let widget;
    describe('is rendered without icon', () => {
        beforeEach(() => {
            widget = buildWidget(orderStatus);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('renders textSpan', () => {
            expect(widget.getComponent('textualDisplay')).to.be.not.undefined;
            expect(widget.getComponent('ebayNotice')).to.be.undefined;
        });
    });

    describe('is rendered with icon', () => {
        beforeEach(() => {
            widget = buildWidget(orderStatusWithIcon);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('renders ebay-notice', () => {
            expect(widget.getComponent('textualDisplay')).to.be.undefined;
            expect(widget.getComponent('ebayNotice')).to.be.not.undefined;
        });
    });
});
