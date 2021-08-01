/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // Verifies that mouse-over text is displayed
        // cy.get('div.mouse-hover-content').invoke('show')
        // {force:true} Does not require that mouse-over text be displayed
        cy.contains('Top').click({force:true})
        cy.url().should('include', 'top')
})
})