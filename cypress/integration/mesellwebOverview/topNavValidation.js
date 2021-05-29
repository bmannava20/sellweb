/// <reference types="Cypress" />

const loc = Cypress.env('localeFile')

describe(`SellerHub Overview - ${loc}`, function () {
    this.beforeEach(() => {
        cy.log('ENV: ', JSON.stringify(Cypress.env(), null, 2))

    cy.loadFixtures(this).as('locale')
})
    it('Customize: we can customize', function () {
        cy.visitAndLogin(this.locale.urls.baseTestDomain + this.locale.urls.baseOverviewPagePath)

        cy.get(this.locators.shMain).contains('a', 'All Selling').click()
        cy.url().should('eq', this.locale.urls.allSellingOrdersUrl)