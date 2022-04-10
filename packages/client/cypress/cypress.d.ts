declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable<JQuery<HTMLElement>>
    getToken(): Chainable<string | null>
    tokenExists(): void
    submitForm(input: Record<string, any>): Chainable<JQuery<HTMLElement>>
    snackbarError(error: string): void
    ignoreError(): void
    login(): Chainable<JQuery<HTMLElement>>
  }
}
