'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const renderer = require('../index.marko');
const mockData = require('./fixtures/default');
const testUtil = require('../../../../../../../utils/test-utils/functional');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given bookmark component is rendered', () => {
    let widget;
    let root;
    let stubbedFetch;

    beforeEach((done) => {
        widget = buildWidget({
            model: mockData.model
        });
        root = document.querySelector('.me-bookmark');
        stubbedFetch = sinon.stub(window, 'fetch');
        stubbedFetch.onFirstCall().resolves(testUtil.jsonOk({
            msg: 'OK',
            msgType: 204,
            systemMsg: ''
        }));
        setTimeout(done);
    });

    afterEach(() => {
        widget && widget.destroy();
        stubbedFetch.restore();
    });

    describe('when the bookmark icon is clicked', () => {
        beforeEach((done) => {
            root.click();
            setTimeout(done);
        });

        it('should make svc call', () => {
            expect(stubbedFetch.calledOnce).to.be.true;
            expect(stubbedFetch.calledWith(sinon.match.string, sinon.match({ body: JSON.stringify(widget.state.preferenceModule) }))).to.be.true;
        });
    });
});
