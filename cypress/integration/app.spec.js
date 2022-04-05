/// <reference types="cypress" />

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // click login
    cy.get('#login').click()
    cy.get('button').contains('Sign in with GitHub').click()

 
  })
})
