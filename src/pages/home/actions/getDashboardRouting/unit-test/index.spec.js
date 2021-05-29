'use strict';
const Assert = require('assert');

const {
    EventEmitter
} = require('events');

const {
    promisify
} = require('util');

const nock = require('nock');
const requestLocal = promisify(require('request-local/middleware').create());
const oauth = promisify(require('oauth-ebay')());

const commons = promisify(require('commons-ebay/middleware')({
    type: 'web'
}));

const tracking = promisify(require('tracking-ebay/middleware')());
const cookies = promisify(require('cookies-ebay/middleware')());
const appContext = require('app-context-ebay');
appContext.appName = 'mesellweb';
const createContext = require('runtime-context-ebay').create;

describe(__filename, () => {
    it('should call service with user token', async() => {
        const req = new EventEmitter();

        Object.assign(req, {
            header(key) {
                return this.headers[key];
            },

            headers: {
                referer: 'https://www.google.com'
            },

            url: 'http://www.ebay.com',

            get(name) {
                return this.headers[name];
            },

            query: {}
        });

        const res = new EventEmitter();
        await requestLocal(req, res);
        await commons(req, res);
        await cookies(req, res);
        await oauth(req, res);
        req.ebay.getLevel1UserId = () => 'mesell6';
        req.ebay.getAccountId = () => 134294239;

        const context = await createContext({
            properties: {
                request: req,
                response: res
            }
        });

        // TODO: provide better request query here in case of post
        const data = await context.actions.getDashboardRouting({
            source: 'EMAIL_SHERPA_REQUIRED_ASPECTS'
        });

        Assert.deepEqual({ 'screenFlowDestination': { '_type': 'Action', 'type': 'NAV', 'name': 'SELLER_DASHBOARD_URL', 'URL': 'https://www.qa.ebay.com/mys/active/rf/container_filter=ACTIVE_ITEM_SPECIFICS_REQUIRED&_trksid=p2561389.m45406.l46975' }, 'requestParameters': { 'isRedirect': 'true' } }, data);
    });

    it('should call service with app token and fail due to 404', async() => {
        const req = new EventEmitter();

        Object.assign(req, {
            header(key) {
                return this.headers[key];
            },

            headers: {
                referer: 'https://www.google.com'
            },

            url: 'http://www.ebay.com',

            get(name) {
                return this.headers[name];
            },

            query: {}
        });

        const res = new EventEmitter();
        await requestLocal(req, res);
        await commons(req, res);
        await cookies(req, res);
        await tracking(req, res);
        await oauth(req, res);
        req.ebay.getLevel1UserId = () => 'mesell6';
        req.ebay.getAccountId = () => 134294239;

        const context = await createContext({
            properties: {
                request: req,
                response: res
            }
        });

        const session = nock('http://www.mesellexp.qa.ebay.com:80').get(/.*/).reply(404);

        try {
            // TODO: provide better request query here in case of post
            await context.actions.getDashboardRouting({});
            return Promise.reject(new Error('Should have failed'));
        } catch (error) {
            Assert.equal(404, error.statusCode, `${error.stack}`);
            session.done();
        }
    });
});
