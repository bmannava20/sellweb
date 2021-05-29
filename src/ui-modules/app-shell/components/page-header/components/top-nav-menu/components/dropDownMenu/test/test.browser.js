'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const itemList = require('../index.marko');
const mockData = require('./fixtures/default');

function buildWidget(data) {
    return itemList
        .renderSync({
            menu: data.menu
        })
        .appendTo(document.body)
        .getComponent();
}

describe('ui-modules/app-shell/components/page-header/components/top-nav-menu/components/dropDownMenu', () => {
    let widget;
    let topNavMenu;
    beforeEach((done) => {
        widget = buildWidget(mockData);
        topNavMenu = widget.getEl('top-menu-item');
        setTimeout(done);
    });
    afterEach(() => {
        widget && widget.destroy();
    });

    describe('On click Menu item should', () => {
        let onButtonClick;
        beforeEach((done) => {
            onButtonClick = sinon.spy(widget, 'onButtonClick');
            topNavMenu.querySelector('button').click();
            setTimeout(done);
        });

        it('call onButtonClick method once ', () => {
            expect(onButtonClick.callCount).to.be.equal(1);
        });
    });

    describe('On focus Menu item should ', () => {
        let closeDropdownMenu;
        beforeEach((done) => {
            closeDropdownMenu = sinon.spy(widget, 'closeDropdownMenu');
            topNavMenu.querySelector('a').click();
            setTimeout(done);
        });

        it('call open the drop down menu and call closeDropdownMenu method once ', () => {
            expect(closeDropdownMenu.callCount).to.be.equal(1);
            expect(topNavMenu.querySelectorAll('.secondary-navigation li').length).to.be.equal(3);
        });
    });

    describe('On clicking hidden menu button ', () => {
        let openDropdownMenu;
        beforeEach((done) => {
            openDropdownMenu = sinon.spy(widget, 'openDropdownMenu');
            topNavMenu.querySelector('button').click();
            setTimeout(done);
        });

        it('should open the menu ', () => {
            expect(openDropdownMenu.callCount).to.be.equal(1);
            expect(topNavMenu.querySelectorAll('.secondary-navigation li').length).to.be.equal(3);
        });
    });
});
