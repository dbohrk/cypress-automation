/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').then(function(el){
        // .prop is not a Cypress method, so .then is used
            const url=el.prop('href')
            cy.log(url)
            cy.visit(url)
        })
})
})