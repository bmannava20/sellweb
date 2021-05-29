/* eslint-disable */
'use strict';

const AsyncValue = require('raptor-async/AsyncValue');
let configDataAsyncValue = null;
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter();
const startTime = Date.now();
let config = null;

function configureApp(config, callback) {
    require('lasso').configure(config.lassoConfig);
    callback();
}

function updateConfig(moduleConfig) {
    const loadedConfig = {};

    loadedConfig.port = process.env.PORT || 8080;
    loadedConfig.urls = moduleConfig.get('urls');
    loadedConfig.rich_config_data = moduleConfig.get('rich_config_data');
    loadedConfig.lassoConfig = moduleConfig.get('lasso');
    console.log(`Configuration loaded in  ${(Date.now() - startTime)} ms`);
    configureApp(loadedConfig, () => {
        configDataAsyncValue.resolve(loadedConfig);
        config = loadedConfig;
    });
}
function loadConfig() {
    configDataAsyncValue = new AsyncValue();
    require('module-config-inc')(module, (err, moduleConfig) => {
        updateConfig(moduleConfig);
        if (typeof moduleConfig.on === 'function') {
            moduleConfig.on('change', () => {
                updateConfig(moduleConfig);
                eventEmitter.emit('change', configDataAsyncValue.data);
            });
        }
    });
}
loadConfig();
exports.onConfigured = function onConfigured(callback) {
    if (configDataAsyncValue.isResolved()) {
        callback(configDataAsyncValue.data);
        return;
    }
    configDataAsyncValue.done((e, config) => {
        callback(config);
    });
};
exports.onChange = function onChange(callback) {
    eventEmitter.on('change', callback);
};
exports.get = function() {
    if (!config) {
        throw new Error('Configuration not fully loaded');
    }
    return config;
};
