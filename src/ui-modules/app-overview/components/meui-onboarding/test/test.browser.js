'use strict';

const chai = require('chai');
const expect = chai.expect;
const mockData = require('./fixtures/full.json');
const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('meui-onboarding', () => {
    describe('empty module', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(mockData.emptyData);
        });

        afterEach(() => {
            widget.destroy();
        });

        it('should not render the onboarding body', (done) => {
            expect(widget.data).to.be.undefined;
            done();
        });
    });
});
