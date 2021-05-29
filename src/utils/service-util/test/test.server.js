'use strict';
const chai = require('chai');
const expect = chai.expect;
const serviceHelper = require('../index');
const provider = require('service-client-ebay');
const sinon = require('sinon');

const mockPayLoad = {
    service: 'MesellActiveExpSvc',
    svcPath: '',
    queryParams: {
        some: 'params'
    },
    reqBody: {
        'sections': []
    }
};

const mockReponse = {
    body: {
        modules: { unsoldListingsModule: { title: { textSpans: [{ text: 'Unsold Module' }] } } }
    }
};

describe('utils/service-util', () => {
    let end;
    let path;
    let post;
    let get;
    let put;
    let getClient;

    beforeEach(() => {
        end = sinon.stub().yields(null, mockReponse);

        path = sinon.stub().returns({
            end: end
        });
        post = sinon.stub().returns({
            path: path
        });
        put = sinon.stub().returns({
            path: path
        });
        get = sinon.stub().returns({
            path: path
        });
        getClient = sinon.stub().returns({
            post: post,
            put: put,
            get: get,
            request: sinon.stub().returns({
                end: end
            })
        });
        sinon.stub(provider, 'context').returns({
            getClient: getClient
        });
    });

    afterEach(() => {
        provider.context.restore();
    });

    describe('serviceHelper', () => {
        it('should test Post method called', async() => {
            mockPayLoad.method = 'post';
            const result = await serviceHelper.processRequest(mockPayLoad, {});
            expect(post.called).to.equal(true);
            expect(result).to.deep.equal(mockReponse.body);
            expect(post.getCall(0).args[0]).deep.equal({ qs: mockPayLoad.queryParams, body: JSON.stringify(mockPayLoad.reqBody) });
        });

        it('should test Put method called', async() => {
            mockPayLoad.method = 'put';
            const result = await serviceHelper.processRequest(mockPayLoad, {});
            expect(put.called).to.equal(true);
            expect(result).to.deep.equal(mockReponse.body);
            expect(put.getCall(0).args[0]).deep.equal({ qs: mockPayLoad.queryParams, body: JSON.stringify(mockPayLoad.reqBody) });
        });

        it('should test Get method called', async() => {
            mockPayLoad.method = 'get';
            const result = await serviceHelper.processRequest(mockPayLoad, {});
            expect(get.called).to.equal(true);
            expect(result).to.deep.equal(mockReponse.body);
            expect(get.getCall(0).args[0]).deep.equal(mockPayLoad.queryParams);
        });
    });
});
