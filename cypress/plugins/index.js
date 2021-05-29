/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const path = require('upath')
const merge = require('deepmerge')

let { DEBUG } = process.env

function getConfigurationByFile(type, file) {
    const pathToConfigFile = path.resolve('cypress', 'config', type, `${file}.js`)
    // eslint-disable-next-line no-console
    console.log('-- plugin.js: loading', pathToConfigFile)
    const conf = require(pathToConfigFile) // eslint-disable-line import/no-dynamic-require, global-require
    if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log('plugin.js: loaded', pathToConfigFile, ' -> ', JSON.stringify(conf, null, 4))
    }
    return conf
}

// plugins file
module.exports = (on, configIn) => {
// The config is deeply merge in this order:
    let config = configIn

    DEBUG = config.env.DEBUG || process.env.DEBUG

    let jsonPrev = process.env.cypress_jsonConfigPrev || '{}'
    try {
        jsonPrev = JSON.parse(jsonPrev)
        if (DEBUG) {
            // eslint-disable-next-line no-console
            console.log('plugin.js: loaded jsonConfigPrev:', JSON.stringify(jsonPrev, null, 4))
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('plugin.js: ERROR parsing jsonConfigPrev', jsonPrev)
    }
    config = merge.all([
        config,
        { env: jsonPrev },
    ])

    // GLOBAL

    const globalFile = config.env.globalFile || 'production'
    config = merge.all([
        config,
        { env: { globalFile } },
        getConfigurationByFile('globals', globalFile),
    ])

    // ENVIRONMENT

    const environmentFile = config.env.environmentFile || 'staging'
    config = merge.all([
        config,
        { env: { environmentFile } },
        getConfigurationByFile('environments', environmentFile),
    ])

    // LOCALE

    const localeFile = config.env.localeFile || 'US'
    config = merge.all([
        config,
        { env: { localeFile } },
        getConfigurationByFile('locales', localeFile),
    ])

    // Take screenshots and video in a localized folder
    config.screenshotsFolder = `cypress/screenshots/${localeFile}`
    config.videosFolder = `cypress/videos/${localeFile}`

    // jsonConfigPost

    let jsonPost = process.env.cypress_jsonConfigPost || '{}'
    try {
        jsonPost = JSON.parse(jsonPost)
        if (DEBUG) {
            // eslint-disable-next-line no-console
            console.log('plugin.js: loaded jsonConfigPost:', JSON.stringify(jsonPost, null, 4))
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('plugin.js: ERROR parsing jsonConfigPost', jsonPost)
    }
    config = merge.all([
        config,
        { env: jsonPost },
    ])

    if (DEBUG) {
        // eslint-disable-next-line no-console
        console.log('plugin.js: FINAL CONFIG:', JSON.stringify(config, null, 4))
    }
    return config
}