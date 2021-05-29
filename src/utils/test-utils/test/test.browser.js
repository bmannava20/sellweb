'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const testUtils = require('../functional');

describe('Test Utils Functional', () => {
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);

    describe('triggerMouseEvent', () => {
        let spy;
        beforeEach((done) => {
            spy = sinon.spy();
            testElement.addEventListener('click', spy);
            testUtils.triggerMouseEvent(testElement, 'click');
            setTimeout(done);
        });

        it('triggers click events', () => {
            expect(spy.calledOnce).to.be.true;
        });
    });
});
