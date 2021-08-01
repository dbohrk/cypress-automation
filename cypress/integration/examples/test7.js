/// <reference types="Cypress" /> 
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My First Test Site', function()
{
    it('My First Test Case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')
        // Switch to iframe mode
        // Find the first occirance of mentorship and click
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)
    })
})

// Open a dirrerent URL in the same tab (alternate method)
// describe('My First Test Site', function () {
//     it('My First Test Case', function () {
//         cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
//         cy.get('#opentab').then(function (el) {
//             // .prop is not a Cypress method, so .then is used
//             const url = el.prop('href')
//             cy.log(url)
//             cy.visit(url)
//         })
//     })
// })