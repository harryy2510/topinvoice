import clientInput from '../fixtures/client'

describe('Clients', function () {
  beforeEach(function () {
    cy.visit('/')
    cy.login()
    cy.dataCy('menu-item-clients').click()
  })

  it('creates new client', function () {
    cy.dataCy('button-add').click()
    cy.submitForm(clientInput)
  })
})
