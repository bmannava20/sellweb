'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/data');
const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('Item title widget', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget(mockData.title);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render item title if present', () => {
        const itemTitleEl = document.getElementsByClassName('item-title')[0];
        expect(itemTitleEl).to.not.be.undefined;
        const itemTitleAncTag = itemTitleEl.getElementsByTagName('a')[0];
        const itemTitle = mockData.title.textSpans[0].text;
        expect(itemTitle).to.not.be.undefined;
        expect(itemTitleAncTag).to.not.be.undefined;
    });

    it('item title should be linkable if present', () => {
        const itemTitleEl = document.getElementsByClassName('item-title')[0];
        const itemTitleHref = mockData.title.action.URL;
        expect(itemTitleEl).to.not.be.undefined;
        const itemTitleAncTag = itemTitleEl.getElementsByTagName('a')[0];
        expect(itemTitleHref).to.not.be.undefined;
        expect(itemTitleAncTag.getAttribute('href')).to.not.be.empty;
    });
});
