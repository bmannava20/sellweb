const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const renderer = require('../index.marko');
const constants = require('../../../utils/helpers/constants');
const spaCommand = constants.SPA_COMMAND.SOLD;

function buildWidget(data) {
    return renderer
        .renderSync(data)
        .appendTo(document.body)
        .getComponent();
}

describe('when add-note modal is rendered with empty note', () => {
    let widget;
    beforeEach(() => {
        widget = buildWidget({
            spaCommand: spaCommand
        });
    });

    afterEach(() => {
        widget.destroy();
    });

    describe('add-note modal open', () => {
        beforeEach(done => {
            widget.openAddNoteHandler(1, '');
            setTimeout(done);
        });

        it('should show the modal with textarea on render', () => {
            const root = document.querySelector('.add-note-modal-wrapper');
            expect(root.getAttribute('aria-hidden')).to.not.be.ok;
            expect(widget.getComponent('addNoteControl')).to.not.be.undefined;
        });
    });
});

describe('when add-note modal is rendered with some note, and BE svc is up', () => {
    let spy;
    let stubbedFetch;
    let widget;
    beforeEach((done) => {
        widget = buildWidget({
            spaCommand: spaCommand
        });
        widget.openAddNoteHandler(1, 'some dummy text');

        stubbedFetch = sinon.stub(window, 'fetch');
        window.fetch.returns(Promise.resolve(mockApiResponse()));
        function mockApiResponse(body = {}) {
            return new window.Response(JSON.stringify(body), {
                status: 200,
                headers: { 'Content-type': 'application/json' }
            });
        }
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
        stubbedFetch.restore();
    });

    describe('when save button is clicked', () => {
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('addNote', spy);
            const btn = document.querySelector('.btn.btn--primary');
            btn.click();
            setTimeout(done);
        });

        it('should save the note and emit the correct event', () => {
            expect(spy.calledOnce).to.be.true;
            const args = spy.getCall(0).args[0];
            expect(args.action).to.equal('reloadMainContainer');
        });
    });
});

describe('when add-note modal is rendered with some note, but BE svc is down', () => {
    let stubbedFetch;
    let widget;
    beforeEach((done) => {
        widget = buildWidget({
            spaCommand: spaCommand
        });
        widget.openAddNoteHandler(1, 'some dummy text');

        stubbedFetch = sinon.stub(window, 'fetch');
        window.fetch.returns(Promise.reject(mockApiResponse()));
        function mockApiResponse(body = {}) {
            return new window.Response(JSON.stringify(body), {
                status: 500,
                headers: { 'Content-type': 'application/json' }
            });
        }
        setTimeout(done);
    });

    afterEach(() => {
        widget.destroy();
        stubbedFetch.restore();
    });

    describe('when save button is clicked', () => {
        let spy;
        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('addNote', spy);
            const btn = document.querySelector('.btn.btn--primary');
            btn.click();
            setTimeout(done);
        });

        it('should not save the note and should not emit any event', () => {
            expect(spy.notCalled).to.be.true;
        });
    });
});
