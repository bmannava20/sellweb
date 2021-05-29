'use strict';

const chai = require('chai');
const should = chai.should();
const template = require('../');
const mockData = require('../mock-data/mock-data.json');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return template
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('meui-module-error model component', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget(mockData);
        root = document.querySelector('.meui-module-error');
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render', () => {
        should.exist(widget);
    });

    it('should have an icon and text', () => {
        should.exist(root.querySelector('svg'));
        should.exist(widget.getEl('content'));
    });
});
