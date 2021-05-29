'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const template = require('../index.marko');
const mockData = require('./mock-data/data');
const multiIitemOrderData = require('./mock-data/multi-item-order');
function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given app-sold/components/item-content is rendered', () => {
    let widget;
    let root;
    let spy;
    beforeEach(() => {
        widget = buildWidget(mockData);
        root = document.querySelector('.sold-item--content');
        spy = sinon.spy();
        widget.on('checkbox-change', spy);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should have unordered list inside ebay-notice', () => {
        const notice = root.querySelector('.item__item-notices');
        expect(notice).to.be.not.null;
    });

    it('should have order number', () => {
        const orderNumber = root.querySelector('.item__order-number');
        expect(orderNumber).to.be.not.null;
    });

    it('should have buyer paid date', () => {
        const buyerDate = root.querySelector('.item__paid-Date');
        expect(buyerDate).to.be.not.null;
    });

    it('should have psa indicator', () => {
        const psaIndicator = root.querySelector('.item__statuses').querySelectorAll('.status');
        expect(psaIndicator.innerText).to.equal(mockData.model.__me.postSaleAuthenticationOrder.textSpans.text);
    });

    it('should have psa indicator tooltip', () => {
        const psaIndicatorToolTip = root.querySelector('.item__statuses').querySelectorAll('.infotip__content');
        expect(psaIndicatorToolTip).be.not.null;
    });

    it('should have escrow indicator', () => {
        const escIndicator = root.querySelector('.item__statuses').querySelectorAll('.status');
        expect(escIndicator.innerText).to.equal(mockData.model.__me.escrowOrder.textSpans.text);
    });

    it('should have escrow indicator tooltip', () => {
        const escrowIndicatorToolTip = root.querySelector('.item__statuses').querySelectorAll('.infotip__content');
        expect(escrowIndicatorToolTip).be.not.null;
    });

    it('should have checkbox and on click should emit event', () => {
        const checkbox = root.querySelector('input[type="checkbox"]');
        expect(checkbox).to.be.not.null;
        checkbox.click();
        expect(spy.calledOnce).to.be.true;
        const args = spy.getCall(0).args[0];
        expect(args.value).to.equal(mockData.model.orderId);
    });

    it('should have secondary button', () => {
        const secondaryButton = root.querySelector('.item__cta-wrapper .item__secondary-btn');
        expect(secondaryButton).to.be.not.null;
    });
    it('should have line actions drop down menu with 4 options ', () => {
        const lineActionMenu = root.querySelector('.item__cta-wrapper .item__inline-cta .expand-btn--secondary');
        expect(lineActionMenu).to.be.not.null;
        const lineActionMenuOptins = root.querySelectorAll('.item__cta-wrapper .item__inline-cta .fake-menu-button__items .fake-menu-button__item').length;
        expect(lineActionMenuOptins).to.be.equal(4);
    });
});

describe('app-sold/components/item-content is rendered for Multi Item Order', () => {
    let widget;
    let root;
    let spy;
    beforeEach(() => {
        widget = buildWidget(multiIitemOrderData);
        root = document.querySelector('.sold-item--content');
        spy = sinon.spy();
        widget.on('checkbox-change', spy);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should have checkbox and on click should emit event', () => {
        const checkbox = root.querySelector('input[type="checkbox"]');
        expect(checkbox).to.be.not.null;
        checkbox.click();
        expect(spy.calledOnce).to.be.true;
        const args = spy.getCall(0).args[0];
        expect(args.value).to.equal(multiIitemOrderData.model.orderId);
    });

    it('should not have order number', () => {
        const orderNumber = root.querySelector('.item__order-number');
        expect(orderNumber).to.be.null;
    });

    it('should have buyer paid date', () => {
        const buyerDate = root.querySelector('.item__paid-Date');
        expect(buyerDate).to.be.null;
    });

    it('should render line actions links for two items', () => {
        const lineActions = root.querySelectorAll('.item__line-actions').length;
        expect(lineActions).to.equal(2);
    });
    it('P2: should render 3 line actions links', () => {
        const inlineActionsLinks = root.querySelectorAll('.item__line-actions')[1].querySelectorAll('.item__inline-actions').length;
        expect(inlineActionsLinks).to.equal(3);
    });
    it('P2: should render edit tracking link', () => {
        const inlineActionsLinks = root.querySelectorAll('.item__line-actions')[0].querySelectorAll('.item__inline-actions').length;
        expect(inlineActionsLinks).to.equal(1);
    });
    it('P2: should render View tracking link', () => {
        const inlineActionsLinks = root.querySelectorAll('.item__line-actions')[0].querySelectorAll('.view-tracking').length;
        expect(inlineActionsLinks).to.equal(1);
    });
});
