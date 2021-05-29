'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const pbcMockData = require('../mock-data/pbc-module.json');
const renderer = require('../index.marko');

function buildWidget(data) {
    const dataModel = {};
    dataModel.model = data;

    return renderer
        .renderSync(dataModel)
        .appendTo(document.body)
        .getComponent();
}

describe('PBC module', () => {
    let widget;
    afterEach(() => {
        widget.destroy();
    });

    it('should be empty because data is empty', (done) => {
        widget = buildWidget({});
        expect(widget.data).to.be.undefined;
        done();
    });

    it('should show button on the page', (done) => {
        widget = buildWidget(pbcMockData.modules.pbcModule);
        const btnElement = document.getElementsByClassName('fake-btn')[0];
        should.exist(btnElement);
        done();
    });

    it('should show the header title text', (done) => {
        widget = buildWidget(pbcMockData.modules.pbcModule);
        const pbcHeaderTitleText = pbcMockData.modules.pbcModule.headerTitle.textSpans[0].text;
        should.exist(pbcHeaderTitleText);
        done();
    });

    it('should show the primary line action button', (done) => {
        widget = buildWidget(pbcMockData.modules.pbcModule);
        const primaryActionBtn = pbcMockData.modules.pbcModule.lineActions.options[0].selections[0].label.textSpans[0].text;
        expect(primaryActionBtn).to.not.be.an('undefined');
        expect(primaryActionBtn).to.include('View and select');
        done();
    });
});
