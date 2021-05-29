'use strict';
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../../mock-data/model.json');
const testUtil = require('../../../../../../../utils/test-utils/functional');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given finish-it-draft component is rendered ', () => {
    let widget;
    let fetchStub;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.modules.finishItModule.lineItems[0] });
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    describe('when delete draft is called and it fails', () => {
        beforeEach((done) => {
            fetchStub = sinon.stub(window, 'fetch');
            fetchStub.onFirstCall().resolves(testUtil.jsonOk({
                msg: 'oops! something went wrong',
                msgType: '500'
            }));
            widget.deleteDraft();
            setTimeout(done);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it('should not make the update fetch call', () => {
            expect(fetchStub.calledOnce).to.be.true;
        });
    });

    describe('when delete draft is called and it succeeds', () => {
        beforeEach((done) => {
            fetchStub = sinon.stub(window, 'fetch');
            fetchStub.onFirstCall().resolves(testUtil.jsonOk({}));
            fetchStub.onSecondCall().resolves(testUtil.jsonOk(mockData));
            widget.deleteDraft();
            setTimeout(done);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it('should make the update fetch call', () => {
            expect(fetchStub.calledTwice).to.be.true;
        });
    });

    describe('when delete draft is called and n/w errors out', () => {
        beforeEach((done) => {
            fetchStub = sinon.stub(window, 'fetch');
            fetchStub.onFirstCall().rejects(testUtil.jsonOk({}));
            widget.deleteDraft();
            setTimeout(done);
        });

        afterEach(() => {
            fetchStub.restore();
        });

        it('should only make one fetch call and set the isRetryPanel to true', () => {
            expect(fetchStub.calledOnce).to.be.true;
            expect(widget.state.isShowRetryPanel).to.be.true;
        });
    });
});
