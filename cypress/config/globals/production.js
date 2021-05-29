// This file has config for when the tests are run in a CI environment
// NOTE: Limit the content in this file to Cypress options
module.exports = {
  videoUploadOnPasses: false,
  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },
}
