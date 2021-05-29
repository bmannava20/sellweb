const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const renderer = require('../index.marko');
const mockData = require('../mock-data/data.json');
const testUtils = require('../../../../../utils/test-utils/functional');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given item-line-actions component is rendered with mark as paid as first option, and BE svc is up', () => {
    let spy;
    let stubbedFetch;
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.lineActionsWithMarkAsPaid });
        stubbedFetch = sinon.stub(window, 'fetch');
        stubbedFetch.onFirstCall().resolves(testUtils.jsonOk({
            msg: 'OK',
            msgType: 204,
            systemMsg: ''
        }));
        root = document.querySelector('.item__cta-wrapper');
    });

    afterEach(() => {
        widget.destroy();
        stubbedFetch.restore();
    });

    describe('when primary button is clicked', () => {
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('soldPageUpdate', spy);
            const btn = root.querySelector('.btn.btn--secondary');
            btn.click();
            setTimeout(done);
        });

        it('should make the call and emit the correct event', () => {
            expect(spy.calledOnce).to.be.true;
            const args = spy.getCall(0).args[0];
            expect(args.action).to.equal('reloadMainContainer');
        });
    });

    describe('when one of the line actions is clicked', () => {
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('soldPageUpdate', spy);
            const btn = root.querySelector('.fake-menu-button__items button:last-child');
            btn.click();
            setTimeout(done);
        });

        it('should make the call and emit the correct event', () => {
            expect(spy.calledOnce).to.be.true;
            const args = spy.getCall(0).args[0];
            expect(args.action).to.equal('reloadMainContainer');
        });
    });
});

describe('given item-line-actions component is rendered with non SPA action as first option, and BE svc is up', () => {
    let spy;
    let stubbedFetch;
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({ model: mockData.lineActions });
        stubbedFetch = sinon.stub(window, 'fetch');
        stubbedFetch.onFirstCall().resolves(testUtils.jsonOk({
            msg: 'OK',
            msgType: 204,
            systemMsg: ''
        }));
        root = document.querySelector('.item__cta-wrapper');
    });

    afterEach(() => {
        widget.destroy();
        stubbedFetch.restore();
    });

    describe('when primary button is clicked', () => {
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('soldPageUpdate', spy);
            const btn = root.querySelector('.item__secondary-btn');
            btn.addEventListener('click', e => e.preventDefault());
            btn.click();
            setTimeout(done);
        });

        it('should not make the call', () => {
            setTimeout(() => {
                expect(spy.calledOnce).to.be.false;
            }, 0);
        });
    });

    describe('when one of the line actions is clicked', () => {
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('soldPageUpdate', spy);
            const btn = root.querySelector('.fake-menu-button__items a');
            btn.addEventListener('click', e => e.preventDefault());
            btn.click();
            setTimeout(done);
        });

        it('should not make the call', () => {
            setTimeout(() => {
                expect(spy.calledOnce).to.be.false;
            }, 0);
        });
    });
});
