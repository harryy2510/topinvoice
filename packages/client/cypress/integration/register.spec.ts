import registerInput from '../fixtures/register'
import onboardingInput from '../fixtures/onboarding'

describe('Sign Up', function () {
  beforeEach(function () {
    cy.visit('/')
    cy.dataCy('link-register').click()
  })

  it('displays validation errors on submitting empty', function () {
    cy.submitForm({})
    cy.dataCy('input-firstName')
      .get('.MuiFormHelperText-root.Mui-error')
      .should('be.visible')
      .should('contain.text', 'Required')
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
      firstName: 'test',
      lastName: 'test',
      email: 'test',
      password: 'test'
    })

    cy.dataCy('input-firstName').should('not.have.descendants', '.MuiFormHelperText-root.Mui-error')

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

  it('is able to register new user & onboard', function () {
    cy.submitForm(registerInput)
    cy.tokenExists()
    cy.url().should('equal', '/onboarding')
    cy.submitForm(onboardingInput)
    cy.url().should('equal', '/')
  })

  it('displays server validation error if email exists', function () {
    cy.submitForm(registerInput)
    cy.snackbarError('Email already exists')
  })
})
