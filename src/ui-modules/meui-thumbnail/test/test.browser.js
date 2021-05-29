'use strict';

const chai = require('chai');
const expect = chai.expect;
const renderer = require('../');
const mockData = require('../mock-data/data.json');

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('thumbnail component', () => {
    let widget;
    let imageWrapper;
    beforeEach((done) => {
        widget = buildWidget({ image: mockData.default });
        imageWrapper = document.querySelector('.meui-img-wrapper');
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render anchor with an image', () => {
        expect(imageWrapper).to.exist;
        const anchorEl = imageWrapper.querySelector('a');
        expect(anchorEl).to.exist;
        expect(anchorEl.getAttribute('href')).to.equal(mockData.default.action.URL);
        const imageEl = imageWrapper.querySelector('img');
        expect(imageEl).to.exist;
        expect(imageEl.getAttribute('src')).to.equal(mockData.default.URL);
    });
});

describe('thumbnail component with empty Image Url', () => {
    let widget;
    let imageWrapper;
    beforeEach((done) => {
        widget = buildWidget({ image: mockData.empty });
        imageWrapper = document.querySelector('.meui-img-wrapper img');
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should not render anything if image url is undefined', () => {
        expect(imageWrapper).to.be.null;
    });
});

describe('thumbnail component with no action property', () => {
    let widget;
    let imageWrapper;
    beforeEach((done) => {
        widget = buildWidget({ image: mockData.imageWithNoAction });
        imageWrapper = document.querySelector('.meui-img-wrapper');
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
    });

    it('should render image with no anchor tag', () => {
        expect(imageWrapper).to.exist;
        const imageEl = imageWrapper.querySelector('img');
        expect(imageEl).to.exist;
        expect(imageEl.getAttribute('src')).to.equal(mockData.imageWithNoAction.URL);
    });
});
