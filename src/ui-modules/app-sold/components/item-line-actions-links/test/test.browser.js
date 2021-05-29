'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const lineActionData = require('./fixtures/line-actions.json');
const viewTrackingData = require('./fixtures/ship-tracking-actions.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('when item-content-line-actions', () => {
    describe('is rendered without view tracking', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(lineActionData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show line actions', () => {
            expect(widget.getComponents('viewTracking')).to.be.empty;
            expect(widget.getComponents('meuinavlink')).to.be.not.empty;
        });
    });

    describe('is rendered with view tracking', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(viewTrackingData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show line actions plus view tracking link', () => {
            expect(widget.getComponents('viewTracking')).to.be.not.empty;
            expect(widget.getComponents('meuinavlink')).to.be.not.empty;
        });
    });
});
