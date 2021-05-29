'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/model');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('when draft-listing component', () => {
    describe('is rendered with data', () => {
        let widget;
        let root;

        beforeEach((done) => {
            widget = buildWidget(mockData);

            root = document.querySelector('.drafts-page__list');
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show checkboxes for all items', () => {
            expect(root.querySelectorAll('.checkbox__control').length).to.be.equal(5);
        });

        it('should change state when input is checked', () => {
            const handleSingleCheckboxClick = sinon.spy(widget, 'handleSingleCheckboxClick');
            root.querySelector('.checkbox__control').click();
            expect(handleSingleCheckboxClick.callCount).to.be.equal(1);
        });
    });

    describe('is rendered with no drafts', () => {
        let widget;
        let root;

        beforeEach((done) => {
            widget = buildWidget({});

            root = document.querySelector('.drafts-page__list');
            setTimeout(done);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should not render the component', () => {
            expect(root).to.be.null;
        });
    });
});

