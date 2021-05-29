// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// import 'cypress-wait-until';

// Add the testing library commands: https://testing-library.com/docs/cypress-testing-library/intro !!!
import '@testing-library/cypress/add-commands'

// This function is a little atypical and keep running asyncronusly to dismiss blockinig dialogs
function dismissWidzardIfPresent() {
  return cy.get('body').then(($body) => new Promise((resolve) => {
  // synchronously query from body
  // to find which element was created
    setTimeout(() => {
      let $widzardButton = $body.find('.minerva-dialog .minerva-button, .minerva-tooltip .minerva-button')
      let id

      if ($widzardButton.length) {
        id = setInterval(() => {
          // cy.log(`Found widzard button`);

          // keep clicking on the buttons in the widzard
          $widzardButton = $body.find('.minerva-dialog .minerva-button, .minerva-tooltip .minerva-button')
          if ($widzardButton.length) {
            // cy.log(`Clicking widzard button`);
            $widzardButton.click()
          } else {
            // cy.log(`Done with the widzard`);
            clearInterval(id)
            resolve(true)
          }
        }, 500)
      } else {
        resolve(true)
      }
    }, 10)
  }))
}

// This function is a little atypical and keep running asyncronusly to dismiss blockinig dialogs
function dismissGdprBannerIfPresent() {
  cy.get('body').then(($body) => {
    // synchronously query from body
    // to find which element was created
    setTimeout(() => {
      const $acceptButton = $body.find('#gdpr-banner-accept')
      if ($acceptButton.length) {
        cy.log('Found GDPR acknoledge button')
        $acceptButton.click()
      }
    }, 2000)
  })
}

const defaultPassword = 'password'

function login(username, password) {
  const passwordFinal = password || defaultPassword
  cy.log(`Login with: ${username}/${passwordFinal}`)
  cy.get('input[name="userid"]').type(`${username}`)
  cy.get('button[name="signin-continue-btn"]').click()

  dismissGdprBannerIfPresent()
  cy.get('input[name="pass"]').type(`${passwordFinal}`)
  cy.get('button[name="sgnBt"]').click()
}

// Visit a page and login before if necessary. It can optinally
Cypress.Commands.add('visitAndLogin', (newUrl = 'Missing URL!', opt = {}) => cy.url().then((currentUrl) => {
  if (currentUrl !== newUrl || opt.forceReload) {
    cy.log(`visitAndLogin - Going to: ${newUrl}`)
    cy.visit(newUrl)
    cy.url().then((url) => {
      if (url.match(/ws\/eBayISAPI\.dll\?SignIn/)) {
        // Login if necessary
        cy.get('@locale').then((gotLocale) => {
          const locale = opt.locale || gotLocale || {}
          // The username is either passed directly in opt or in the locale fixture or in an environment variable
          const username = locale.username || opt.username || Cypress.env('username')
          const password = locale.password || opt.password || Cypress.env('password')

          login(
            username,
            password,
          )
          cy.url().then((postLoginUrl) => {
            if (postLoginUrl.match(/\/reg\/(UpdateContactInfo|ChangeSecretQuestion)/)) {
              cy.get('#rmdLtr').click()
            }
          })
        })
      }
    })
    cy.url().should('include', newUrl)
    dismissGdprBannerIfPresent()
    dismissWidzardIfPresent()
  }
  cy.log(`visitAndLogin - Not reloading. We are already on: ${newUrl}`)
}))

Cypress.Commands.add('logout', () => {
  cy.log('Logining out')
  cy.visit('/logout')
  cy.url().should('include', '/logout')
})

Cypress.Commands.add('loadFixtures', ({
  locale,
  environment,
} = {}) => {
  // Local file. Ex: US, DE, etc. It is the file under cypress/fixtures/currentEnvironment
  const currentLocale = locale || Cypress.env('localeFile')
  cy.log(`currentLocale ${JSON.stringify(currentLocale, null, 2)}`)

  // Fixture environment folder. Ex: staging, preprod, etc. It is the folder in cypress/fixtures
  const currentEnvironment = environment || Cypress.env('environment')
  cy.log(`currentEnvironment ${JSON.stringify(currentEnvironment, null, 2)}`)

  const path = `${currentEnvironment}/locales/${currentLocale}`

  return cy.fixture(`${currentEnvironment}/locales/${currentLocale}`)
    .then((json) => {
      cy.log(`Loading fixtures:${path} -> ${JSON.stringify(json)}`)
      cy.wrap(json)
    })
})
