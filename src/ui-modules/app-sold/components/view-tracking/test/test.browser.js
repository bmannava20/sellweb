'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const defaultData = require('./fixtures/default.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given view-tracking component', () => {
    describe('is rendered with no data', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget({});
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have no button displayed', () => {
            expect(widget.getEl('viewTrackingBtn')).to.be.undefined;
        });
    });

    describe('is rendered with default json', () => {
        let widget;

        beforeEach(() => {
            widget = buildWidget(defaultData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have button displayed', () => {
            expect(widget.getEl('viewTrackingBtn')).to.not.be.undefined;
        });
    });
});

describe('when view tracking button is clicked', () => {
    let spy;
    let widget;
    beforeEach(() => {
        widget = buildWidget(defaultData);
        spy = sinon.spy();
        widget.on('emitTrackingDetails', spy);
        const btn = widget.getEl('viewTrackingBtn').querySelector('.fake-link');
        btn.click();
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('it emits the event with the correct data', () => {
        expect(spy.calledOnce).to.be.true;
        const actualUrl = spy.getCall(0).args[0].url;
        const expectedUrl = defaultData.model.action.URL;
        expect(actualUrl).to.equal(expectedUrl);
    });
});
