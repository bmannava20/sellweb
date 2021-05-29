'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/model.json');
const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('Reply to it module', () => {
    let widget;
    afterEach(() => {
        widget && widget.destroy();
    });

    it('should be empty because data is empty', (done) => {
        widget = buildWidget({});
        expect(widget.data).to.be.undefined;
        done();
    });
    it('should render Reply to it module data model', () => {
        widget = buildWidget(mockData);
        const itemsListEl = document.getElementsByClassName('item-list');
        expect(itemsListEl.length).to.be.equal(1);
        expect(itemsListEl[0].getElementsByClassName('meui-item-tile')).to.have.length(2);
    });
});
