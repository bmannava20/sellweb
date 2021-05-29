'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const template = require('../index.marko');
const sendInvoice = require('../mock-data/send-invoice.json');
const markPaymentReceived = require('../mock-data/mark-payment-received.json');
const getShipTipsOnShipping = require('../mock-data/get-ship-tips-on-shipping.json');
const testUtil = require('../../../../../../../utils/test-utils/functional');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('Await for payments component', () => {
    describe('should show Send invoice ', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(sendInvoice);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show white primary button on the page', () => {
            expect(widget.getEl('await-payment-btn').querySelector('.fake-btn').innerText).to.equal('Send invoice');
            expect(widget.getEl('await-payment-btn').querySelector('.fake-btn').classList.contains('fake-btn--primary')).to.be.false;
        });

        it('show white inline action menu on the page', () => {
            expect(widget.getEl('await-payment-btn').querySelector('.fake-menu-button__button').classList.contains('btn--primary')).to.be.false;
        });

        it('show white menu button with one of the menu item option for mark as payment with contractIds attribute', () => {
            expect(widget.getEl('await-payment-btn').querySelector('.fake-menu-button__button')).to.not.be.undefined;
            expect(widget.getEl('await-payment-btn').querySelector('button.fake-menu-button__item')).to.not.be.undefined;
            expect(widget.getEl('await-payment-btn').querySelector('button.fake-menu-button__item').getAttribute('data-contract-id')).to.not.be.undefined;
        });

        it('as a link', () => {
            expect(widget.getEl('await-payment-btn').querySelector('.fake-menu-button__item')).to.be.defined;
        });

        it(' show white menu button with one of the menu item option for mark as payment with contractIds attribute', () => {
            expect(widget.getEl('await-payment-btn').querySelector('button[data-target-fn]')).to.not.be.undefined;
        });
    });

    describe('should show Mark as payment ', () => {
        let widget;
        let fetchStub;
        let root;
        beforeEach((done) => {
            widget = buildWidget(markPaymentReceived);
            root = document.querySelector('.await-payment-item');
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('blue button on the page', () => {
            expect(widget.getComponent('await-payment-button').el.classList.contains('btn--primary')).to.be.true;
        });
        it('show blue menu button ', () => {
            expect(widget.getComponent('await-payment-button').el.classList.contains('btn--primary')).to.be.true;
        });
        it('as a button', () => {
            expect(widget.getComponent('await-payment-button').el).to.not.be.undefined;
        });

        describe('when mark as payment button is clicked and mark as paid call succeeds', () => {
            let primaryBtn;
            let spy;
            beforeEach((done) => {
                spy = sinon.spy();
                widget.on('updateAwaitingPaymentModule', spy);
                fetchStub = sinon.stub(window, 'fetch');
                fetchStub.onFirstCall().resolves(testUtil.jsonOk({
                    msg: 'OK',
                    msgType: 204,
                    systemMsg: ''
                }));
                fetchStub.onSecondCall().resolves(testUtil.jsonOk({}));
                primaryBtn = root.querySelector('.await-payment-button');
                primaryBtn.click();
                setTimeout(done);
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it('should make the mark as paid & spa fetch calls', () => {
                const contractId = primaryBtn.getAttribute('data-contract-id');
                const expectedReqBody = { contractIds: contractId };
                expect(fetchStub.calledWith(sinon.match.string, sinon.match({ body: JSON.stringify(expectedReqBody) }))).to.be.true;
                expect(fetchStub.calledOnce).to.be.true;
                expect(spy.calledOnce).to.be.true;
                const args = spy.getCall(0).args[0];
                expect(args.data).to.be.not.null;
            });
        });

        describe('when mark as payment button is clicked and mark as paid call fails', () => {
            let primaryBtn;
            beforeEach((done) => {
                fetchStub = sinon.stub(window, 'fetch');
                fetchStub.onFirstCall().resolves(testUtil.jsonOk({
                    msg: 'ops! something went wrong',
                    msgType: '500'
                }));
                fetchStub.onSecondCall().resolves(testUtil.jsonOk({}));
                primaryBtn = root.querySelector('.await-payment-button');
                primaryBtn.click();
                setTimeout(done);
            });

            afterEach(() => {
                fetchStub.restore();
            });

            it('should still make the mark as paid & spa fetch calls', () => {
                const contractId = primaryBtn.getAttribute('data-contract-id');
                const expectedReqBody = { contractIds: contractId };
                expect(fetchStub.calledWith(sinon.match.string, sinon.match({ body: JSON.stringify(expectedReqBody) }))).to.be.true;
                expect(fetchStub.calledOnce).to.be.true;
            });
        });
    });

    describe('should show Get tips on shipping ', () => {
        let widget;
        beforeEach((done) => {
            widget = buildWidget(getShipTipsOnShipping);
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });
        it('white button on the page', () => {
            expect(widget.getComponent('await-payment-button').el.innerText).to.equal('Get tips on shipping');
            expect(widget.getComponent('await-payment-button').el.classList.contains('btn--secondary')).to.be.true;
        });
        it('with white inline action menu on the page', () => {
            expect(widget.getComponent('await-payment-button').el.classList.contains('btn--secondary')).to.be.true;
        });

        it(' show white menu button with one of the menu item option for mark as payment with contractIds attribute', () => {
            expect(widget.getEl('await-payment-btn').querySelector('.fake-menu .expand-btn')).to.not.be.undefined;
            expect(widget.getEl('await-payment-btn').querySelector('.expander__content')).to.not.be.undefined;
        });

        it('as a button', () => {
            expect(widget.getEl('await-payment-btn').innerText).to.not.be.undefined;
        });
    });
});
