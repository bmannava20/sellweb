'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const toolTip = require('../index.marko');
const mockData = require('../mock-data/modal.json');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return toolTip
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('list-it component', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget(mockData);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should show button on the page', () => {
        const btnElement = document.getElementsByClassName('fake-btn')[0];
        should.exist(btnElement);
    });

    it('button should have text on the page', () => {
        const btnElement = document.getElementsByClassName('fake-btn')[0];
        expect(btnElement.innerText).to.equal(mockData.listItemButton.textSpans[0].text);
    });

    it('should show heading if present', () => {
        const el = document.getElementsByClassName('section-text')[0];
        expect(el.innerText).to.equal(mockData.listItemText.textSpans[0].text);
    });
});
