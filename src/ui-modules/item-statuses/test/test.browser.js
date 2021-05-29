'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const template = require('../index.marko');
const statusWithInfoTip = require('./mock-data/status-with-infotip');
const statusWithModal = require('./mock-data/status-with-modal');
const statusWithoutInfoTip = require('./mock-data/status-without-infotip');
function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given item-statuses is rendered with info tip', () => {
    let widget;
    let root;
    let spy;
    beforeEach(() => {
        widget = buildWidget(statusWithInfoTip);
        root = document.querySelector('.item__statuses');
        spy = sinon.spy();
        widget.on('checkbox-change', spy);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should have status', () => {
        const status = root.querySelector('.status');
        expect(status.innerText).to.equal(statusWithInfoTip.model[0].label[0].text);
    });

    it('should have tooltip', () => {
        const infoTip = root.querySelector('.infotip__content');
        expect(infoTip).be.not.null;
    });
});

describe('given item-statuses is rendered with modal', () => {
    let widget;
    let root;
    let spy;
    beforeEach(() => {
        widget = buildWidget(statusWithModal);
        root = document.querySelector('.item__statuses');
        spy = sinon.spy();
        widget.on('checkbox-change', spy);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should have status', () => {
        const status = root.querySelector('.status');
        expect(status.innerText).to.equal(statusWithModal.model[0].label[0].text);
    });

    it('should have modal', () => {
        const modal = root.querySelector('.dialog__main');
        expect(modal).be.not.null;
    });
});

describe('given item-statuses is rendered without info tip', () => {
    let widget;
    let root;
    let spy;
    beforeEach(() => {
        widget = buildWidget(statusWithoutInfoTip);
        root = document.querySelector('.item__statuses');
        spy = sinon.spy();
        widget.on('checkbox-change', spy);
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should have status', () => {
        const status = root.querySelector('.status');
        expect(status.innerText).to.equal(statusWithoutInfoTip.model[0][0].text);
    });

    it('should not have tooltip', () => {
        const infoTip = root.querySelector('.infotip__content');
        expect(infoTip).be.null;
    });
});
