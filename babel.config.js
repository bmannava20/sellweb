require('core-js');
const env = require('environment-ebay');
module.exports = (api) => {
    api.cache(true);
    const presets = [];
    const plugins = [];

    if (env.isDev()) {
        presets.push([
            '@babel/env',
            {
                useBuiltIns: false
            }
        ]);
    } else {
        presets.push([
            '@babel/env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ]);

        plugins.push([
            '@babel/plugin-transform-runtime',
            {
                'absoluteRuntime': false,
                'corejs': 3,
                'helpers': true,
                'regenerator': true,
                'useESModules': false
            }
        ]);
    }

    return {
        'babelrc': false,
        'ignore': [
            '*.json',
            'node_modules/!(@ebay)**',
            'node_modules/!(lasso)**'
        ],
        'presets': presets,
        'plugins': plugins
    };
};
