import invoiceInput from '../fixtures/invoice'

describe('Invoices', function () {
  beforeEach(function () {
    cy.visit('/')
    cy.login()
    cy.dataCy('menu-item-invoices').click()
  })

  it('creates new invoice', function () {
    cy.dataCy('button-add').click()
    cy.dataCy('input-company.id').click()
    cy.get('.MuiAutocomplete-popper li').first().click()
    cy.submitForm({})
    cy.dataCy('button-add-item').click()
    cy.submitForm(invoiceInput)
  })
})
