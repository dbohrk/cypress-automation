/// <reference types="Cypress" /> 
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My First Test Site', function()
{
    before(function(){ 
        // Runs before all blocks
        // All fixture data should be loaded in before
        cy.fixture('example').then(function(data){
            // this. makes variable (data) available everywhere
            this.data=data
        })
    })

    it('Validates Web Page Fields',function() {
        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        // Use data.name to use data from example file loaded in before()
        cy.get(':nth-child(1) > .form-control').type(this.data.name)
        cy.get('select').select(this.data.gender)
        // Check that Name is also in Two-way Data Binding example
        cy.get(':nth-child(4) > .ng-valid').should('have.value', this.data.name);
        // Check the required length is two or more characters
        cy.get(':nth-child(1) > .form-control').should('have.attr', 'minlength', '2');
        // Check that radio buton is disabled
        cy.get('#inlineRadio3').should('be.disabled');
        // Click the Shop button at the top of the page
        cy.get(':nth-child(2) > .nav-link').click()
        // Add Products to cart
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)            
        });
    })
})

// Open a different URL in the same tab (alternate method)
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