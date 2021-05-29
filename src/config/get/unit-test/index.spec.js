'use strict';

const Assert = require('assert');
require('app-module-path').addPath(process.cwd());
const createContext = require('runtime-context-ebay').create;

describe(__filename, () => {
    it('action get should be discovered', async() => {
        const context = await createContext();
        Assert.ok(context.config.get);
    });

    it('action get should fail', async() => {
        const context = await createContext({
            functions: {
                'config': {
                    'get': new Error('BOOM')
                }
            }
        });
        try {
            await context.config.get();
        } catch (err) {
            Assert.equal('BOOM', err.message);
        }
    });

    it('action get should be called', async() => {
        const context = await createContext();
        Assert.ok(await context.config.get('services'));
    });
});
