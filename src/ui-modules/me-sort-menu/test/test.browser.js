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

describe('me-sort-menu compopent should', () => {
    let firstItem;
    let widget;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        firstItem = document.querySelector('.menu-button__item');
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    describe('when an item is clicked', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            widget.on('handleSortRequest', spy);
            firstItem.click();
        });

        it('then it emits the menu-select event with correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.action).to.be.equal(mockData.model.options[0].paramKey);
            expect(eventData.actionParams).to.be.equal(mockData.model.options[0].action.URL);
        });
    });
});
