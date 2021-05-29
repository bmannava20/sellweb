'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('../mock-data/data.json');
const renderer = require('../');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given meui-task-tracker component is rendered', () => {
    let widget;
    let root;
    beforeEach(() => {
        widget = buildWidget({ model: mockData });
        root = document.querySelector('.progress-bar');
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should show progress tracker on the page', () => {
        const el = root.querySelector('.meui-task-tracker');
        const liElements = el.getElementsByTagName('li');
        const events = mockData.orderProgressStatus;
        expect(liElements.length).to.equal(events.length);
    });
});
