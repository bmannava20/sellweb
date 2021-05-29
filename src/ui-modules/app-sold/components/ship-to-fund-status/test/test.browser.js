'use strict';

const chai = require('chai');
const expect = chai.expect;
const template = require('../index.marko');
const defaultData = require('../mock-data/data.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given ship-to-fund-status component', () => {
    describe('is rendered with no data', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget({});
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have no notice displayed', () => {
            expect(widget.getComponent('shipToFundNotice')).to.be.undefined;
        });
    });

    describe('is rendered with default json', () => {
        let widget;
        beforeEach(() => {
            widget = buildWidget(defaultData);
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should have notice displayed', () => {
            expect(widget.getComponent('shipToFundNotice')).to.not.be.undefined;
        });
    });
});
