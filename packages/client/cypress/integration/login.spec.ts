import loginInput from '../fixtures/login'
import onboardingInput from '../fixtures/onboarding'
import registerInput from '../fixtures/register'

describe('Log In', function () {
  before(function () {
    cy.ignoreError()

    cy.visit('/')
    cy.dataCy('link-register').click()
    cy.submitForm({ ...registerInput, ...loginInput })

    cy.url().then((url) => {
      if (url === '/register') {
        cy.dataCy('link-login').click()
        cy.submitForm(loginInput)
        cy.wait(300)
      }
    })

    cy.url().then((url) => {
      if (url === '/onboarding') {
        cy.submitForm(onboardingInput)
        cy.wait(300)
      }
    })

    cy.url().then((url) => {
      if (url === '/') {
        cy.dataCy('button-profile').click()
        cy.wait(300)
        cy.dataCy('menu-item-logout').click()
        cy.wait(300)
      }
    })
  })

  beforeEach(function () {
    cy.visit('/login')
  })

  it('displays validation errors on submitting empty', function () {
    cy.submitForm({})
    cy.dataCy('input-email')
      .get('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .should('contain.text', 'Required')
    cy.dataCy('input-password')
      .get('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .should('contain.text', 'Required')
  })

  it('displays validation errors on submitting with invalid input', function () {
    cy.submitForm({
      email: 'test',
      password: 'test'
    })

    cy.dataCy('input-email')
      .get('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .should('contain.text', 'Should be a valid email address')

    cy.dataCy('input-password')
      .get('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .should(
        'contain.text',
        'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
      )
  })

  it('displays server validation error if email does not exists', function () {
    cy.submitForm({ email: 'nonexisting@email.com', password: 'asDF1234$' })
    cy.snackbarError('Invalid credentials')
  })

  it('is able to login', function () {
    cy.submitForm(loginInput)
    cy.tokenExists()
    cy.url().should('equal', '/')
  })
})
