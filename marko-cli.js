'use strict';
const path = require('path');

function testMatcher(file) {
    // do not run markotester files while running marko-cli
    const testRegExp = /^(?:(.+?)[-.])?(?:test)(?:[-.](server|browser))?[.]/i;
    const basename = path.basename(file);
    const testMatches = testRegExp.exec(basename);

    if (!testMatches) {
        // The file is not a test file
        return false;
    }

    return {
        groupName: testMatches[1],
        env: testMatches[2] || 'browser'
    };
}


module.exports = ({ config }) => {
    config.mochaOptions = {
        timeout: 20000,
        reporter: 'mocha-multi-reporters',
        reporterOptions: 'configFile=./mocha-multi-reporters-config.json'
    };
    config.lassoOptions = {
        require: {
            transforms: [{
                transform: 'lasso-babel-transform'
            }]
        },
        plugins: [
            'lasso-less'
        ],
        flags: ['skin-ds6']
    };
    config.browserTestDependencies = [
        './src/ui-modules/layout-app/browser.json'
    ];
    config.testMatcher = testMatcher;
    // do not run markotester files while running marko-cli
};
