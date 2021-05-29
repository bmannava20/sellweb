'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const itemList = require('../index.marko');
const mockData = require('./fixtures/default');

function buildWidget(data) {
    return itemList
        .renderSync({
            model: data.model
        })
        .appendTo(document.body)
        .getComponent();
}

describe('ui-modules/app-shell/components/page-header/components/survey-n-classic-links', () => {
    let widget;
    let topNavMenu;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        topNavMenu = widget.getEl('top-nav-links');
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });

    describe('On clicking switch to classic button should', () => {
        let openClassicPrefDialog;
        beforeEach((done) => {
            openClassicPrefDialog = sinon.spy(widget, 'openClassicPrefDialog');
            setTimeout(() => {
                topNavMenu.querySelector('.switch-classic-link').click();
                done();
            }, 0);
        });

        it('call openClassicPrefDialog method once ', () => {
            expect(openClassicPrefDialog.callCount).to.be.equal(1);
        });
    });
});
