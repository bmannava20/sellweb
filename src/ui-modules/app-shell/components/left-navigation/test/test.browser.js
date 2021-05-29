'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const menu = require('../index.marko');
const mockData = require('../mock-data/data.json');
const testUtil = require('../../../../../utils/test-utils/functional');

function buildWidget(data) {
    return menu
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given left-navigation component is rendered with selling menu as expanded', () => {
    let widget;
    let fetchStub;
    let root;
    beforeEach(() => {
        widget = buildWidget({ model: mockData });
        root = document.querySelector('.left-navigation');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    describe('when buying submenu is expanded and BE svc is up', () => {
        beforeEach(() => {
            fetchStub = sinon.stub(window, 'fetch');
            fetchStub.onFirstCall().resolves(testUtil.jsonOk({}));
            const firstBtn = [...root.querySelectorAll('button')].find(a => a.textContent === 'Buying');
            testUtil.triggerMouseEvent(firstBtn, 'mousedown');
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it('should make the update fetch call', () => {
            const expectedReqBody = { MeSellLeftNavPreference: { buy: 'open', follow: 'close', sell: 'open' } };
            expect(fetchStub.calledWith(sinon.match.string, sinon.match({ body: JSON.stringify(expectedReqBody) }))).to.be.true;
            expect(fetchStub.calledOnce).to.be.true;
        });
    });
});
