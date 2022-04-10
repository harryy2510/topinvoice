import 'cypress-localstorage-commands'
import getPrefixedKey from '../../src/utils/getPrefixedKey'
import loginInput from '../fixtures/login'

Cypress.Commands.add('dataCy', (value) => cy.get(`[data-cy="${value}"]`))
Cypress.Commands.add('ignoreError', () => cy.on('uncaught:exception', () => false))
Cypress.Commands.add('snackbarError', (error) => {
  cy.waitFor('.SnackbarItem-variantError .SnackbarItem-message').then(function () {
    cy.get('.SnackbarItem-variantError .SnackbarItem-message').should('be.visible').should('contain.text', error)
  })
})
Cypress.Commands.add('getToken', () => cy.getLocalStorage(getPrefixedKey('AUTH_TOKEN', 'TOPINVOICE_V1')))
Cypress.Commands.add('tokenExists', () => cy.wait(300).getToken().should('not.equal', null))
Cypress.Commands.overwrite('url', () => cy.location('pathname'))
Cypress.Commands.add('submitForm', (input) => {
  Object.keys(input).forEach((key) => {
    cy.dataCy(`input-${key}`).type(input[key]).blur({ force: true })
  })
  return cy.dataCy('button-submit').click()
})
Cypress.Commands.add('login', () => cy.submitForm(loginInput))
