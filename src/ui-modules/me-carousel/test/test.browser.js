'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const template = require('../index.marko');
const mockData = require('../mock-data/model');
const mockDataEmpty = require('../mock-data/model-empty');
const expectedMockdataModel = require('../mock-data/expectedOutput');

function buildWidget(data) {
    return template
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}
describe('given me-carousel component is rendered ', () => {
    describe('using default data', () => {
        let widget;
        let root;

        beforeEach(() => {
            widget = buildWidget(mockData);
            root = document.querySelector('.me-carousel');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('show carousel component', () => {
            expect(root.querySelector('.carousel__container')).to.be.not.undefined;
            expect(root.querySelector('.carousel__container')).to.be.not.equal(null);
            expect(root.querySelector('.carousel__container .carousel__control--prev')).to.be.not.equal(null);
        });

        describe('when filter pill is clicked', () => {
            let onHandleFilterClick;
            beforeEach((done) => {
                onHandleFilterClick = sinon.spy(widget, 'onHandleFilterClick');
                const pillEl = root.querySelectorAll('.me-carousel__pill')[1];
                pillEl.addEventListener('click', e => e.preventDefault());
                pillEl.click();
                setTimeout(done);
            });

            it('should click filter pill, onHandleFilterClick should be called once ', () => {
                expect(onHandleFilterClick.callCount).to.be.equal(1);
                expect(onHandleFilterClick.args[0][0]).to.be.deep.equal(expectedMockdataModel.expectedTrackingList);
            });
        });
    });

    describe('using no data', () => {
        let widget;
        let root;

        beforeEach(() => {
            widget = buildWidget(mockDataEmpty);
            root = document.querySelector('.me-carousel');
        });

        afterEach(() => {
            widget && widget.destroy();
        });

        it('should not load carousel component', () => {
            expect(root).to.be.null;
        });
    });
});
