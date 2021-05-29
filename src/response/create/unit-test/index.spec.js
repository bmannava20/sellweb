'use strict';

const Assert = require('assert');
require('app-module-path').addPath(process.cwd());
const createContext = require('runtime-context-ebay').create;

describe(__filename, () => {
    it('action create should be discovered', async() => {
        const context = await createContext();
        Assert.ok(context.response.create);
    });

    it('action create should be called', async() => {
        const context = await createContext();
        Assert.deepEqual({
            status: 204
        }, await context.response.create({
            status: 204
        }));
    });
});
