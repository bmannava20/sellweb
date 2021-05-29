'use strict';

const Assert = require('assert');
require('app-module-path').addPath(process.cwd());
const createContext = require('runtime-context-ebay').create;

describe(__filename, () => {
    it('action home should be discovered', async() => {
        const context = await createContext();
        Assert.ok(context.pages.home);
    });

    it('action home should fail', async() => {
        const context = await createContext({
            functions: {
                'pages': {
                    'home': new Error('BOOM')
                }
            }
        });
        try {
            await context.pages.home();
        } catch (err) {
            Assert.equal('BOOM', err.message);
        }
    });
});
