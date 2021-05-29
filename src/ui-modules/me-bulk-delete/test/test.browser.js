'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/model');
const mockDataError = require('../mock-data/error');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given me-bulk-delete component is rendered', () => {
    describe('is rendered using default data', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockData);
            root = document.querySelector('.bulk-action');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show checkbox and delete component', () => {
            expect(root.querySelector('.checkbox__control')).to.be.not.equal(null);
            expect(root.querySelector('.btn--secondary')).to.be.not.equal(null);
        });

        it('should change select all state when input is checked', () => {
            const handleMultiSelectClick = sinon.spy(widget, 'handleMultiSelectClick');
            root.querySelector('.checkbox__control').click();
            expect(handleMultiSelectClick.callCount).to.be.equal(1);
        });
        it('should call open confirmation dialog method', () => {
            const openConfirmationModal = sinon.spy(widget, 'openConfirmationModal');
            root.querySelector('.red-button').click();
            expect(openConfirmationModal.callCount).to.be.equal(1);
        });
    });

    describe('is rendered using error data', () => {
        let widget;
        let root;
        beforeEach(() => {
            widget = buildWidget(mockDataError);
            root = document.querySelector('.bulk-action');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should load error notice when error component', () => {
            expect(root.querySelector('.inline-notice--priority').innerText).to.have.string('We weren’t able to delete these items right now. Please try again later.');
        });
    });
});
