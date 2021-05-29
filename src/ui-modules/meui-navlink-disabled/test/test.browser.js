'use strict';

const expect = require('chai').expect;
const template = require('../index');
const mockData = require('../mock-data/model.json');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('given meui-navlink component', () => {
    let widget;

    afterEach(() => {
        widget && widget.destroy();
    });

    it('should not render anchor tag when input is not passed', () => {
        widget = buildWidget({});
        expect(widget.getEl('meuiNavLinkDisabled')).to.be.undefined;
    });

    it('should not render anchor tag when action is not passed', () => {
        widget = buildWidget({});
        expect(widget.getEl('meuiNavLinkDisabled')).to.be.undefined;
    });

    it('should render anchor tag with provided properties', () => {
        widget = buildWidget(mockData.basicAction);
        const anchorEl = widget.getEl('meuiNavLinkDisabled');
        expect(anchorEl).to.be.not.undefined;
        expect(anchorEl.getAttribute('_sp')).to.equal('p2370942.m4117.l3');
        expect(anchorEl.getAttribute('class')).to.equal(mockData.basicAction.class);
        expect(anchorEl.getAttribute('style')).to.equal(mockData.basicAction.style);
        expect(anchorEl.getAttribute('title')).to.equal(mockData.basicAction.title);
        expect(anchorEl.getAttribute('tabindex')).to.equal(mockData.basicAction.tabindex);
        expect(anchorEl.getAttribute('target')).to.equal(mockData.basicAction.target);
        expect(anchorEl.getAttribute('aria-label')).to.equal(mockData.basicAction.ariaLabel);
    });

    it('should render anchor tag with _sp tag if NAV is present but no NAVSRC', () => {
        widget = buildWidget(mockData.oldAction);
        const anchorEl = widget.getEl('meuiNavLinkDisabled');
        expect(anchorEl).to.be.not.undefined;
        expect(anchorEl.getAttribute('_sp')).to.equal('p2370942.m4117.l3');
    });
});
