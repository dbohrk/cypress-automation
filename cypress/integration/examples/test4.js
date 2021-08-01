/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    // Cypress auto-accepts (OK) pop-ups
    cy.get('#alertbtn').click()
    cy.get('#confirmbtn').click()
   // window:alert event whenever a browser event occurs
   // Alert pop-up
   cy.on('window:alert',(str) => {
       // Mocha method
       expect(str).to.equal('Hello , share this practice page and share your knowledge')
   })
   // Confirm pop-up
   cy.on('window:confirm',(str) => {
    // Mocha method
    expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })
    // Cypress cannot work with a child tab or page
    // The open command must be modified to remove the target
    // Then the tab (child window) will open in the current page
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.url().should('include', '/#/index')
    // Browser controls, browser back
    cy.go('back')
    // Verify that the page is back to the previous page
    cy.url().should('include', 'AutomationPractice')
})
})