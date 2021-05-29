'use strict';

const chai = require('chai');
const expect = chai.expect;
const renderer = require('../');
const mockData = require('./fixtures/model.json').model;

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given me-welcome-screen component is rendered', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({
            model: mockData
        });
        root = document.querySelector('.welcome-screen-modal-wrapper');
    });

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should show the modal onRender if showWelcomeScreen is true', () => {
        expect(mockData.showWelcomeScreen).to.be.true;
        expect(root.getAttribute('aria-hidden')).to.equal('false');
    });

    it('should have heading', () => {
        const heading = root.getElementsByClassName('me-dialog__header')[0];
        expect(heading).to.not.be.null;
    });

    it('should have 3 paragraphs', () => {
        const contentEl = root.getElementsByTagName('li');
        expect(contentEl).to.have.length(3);
    });
});
