'use strict';
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/model.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given see-all component', () => {
    describe('is rendered using action type as NAV', () => {
        let widget;
        let root;
        let spy;
        beforeEach((done) => {
            spy = sinon.spy();
            widget = buildWidget({ model: mockData.seeAllNav });
            widget.on('appUpdate', spy);
            root = document.querySelector('.see-all');
            const seeAllLink = root.querySelector('a');
            seeAllLink.addEventListener('click', e => e.preventDefault());
            setTimeout(() => {
                seeAllLink.click();
                setTimeout(done);
            }, 0);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have a link rendered', () => {
            expect(root.getElementsByTagName('a')).to.have.lengthOf(1);
        });

        it('should not emit any event', () => {
            expect(spy.notCalled).to.be.true;
        });
    });

    describe('is rendered using action type as OPERATION', () => {
        let widget;
        let root;
        let spy;
        beforeEach((done) => {
            spy = sinon.spy();
            widget = buildWidget({ model: mockData.seeAllOperation });
            widget.on('appUpdate', spy);
            root = document.querySelector('.see-all');
            const seeAllLink = root.querySelector('a');
            seeAllLink.addEventListener('click', e => e.preventDefault());
            setTimeout(() => {
                seeAllLink.click();
                setTimeout(done);
            }, 0);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have a link rendered', () => {
            expect(root.getElementsByTagName('a')).to.have.lengthOf(1);
        });

        it('should emit the app-update event with correct data', () => {
            expect(spy.calledOnce).to.be.true;
            const eventData = spy.getCall(0).args[0];
            expect(eventData.url).to.equal(mockData.seeAllOperation.action.URL);
            expect(eventData.type).to.equal(mockData.seeAllOperation.action.type);
            expect(eventData.name).to.equal(mockData.seeAllOperation.action.name);
            expect(eventData.params).to.equal(mockData.seeAllOperation.action.params);
        });
    });
});
