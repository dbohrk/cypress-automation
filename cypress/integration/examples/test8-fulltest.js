/// <reference types="Cypress" /> 
/// <reference types="cypress-iframe" />

import 'cypress-iframe'
// Import the ame used for export from the file pageObjects
import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'

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
       // Create object for class (HomePage)
        const homePage=new HomePage()
        const productPage=new ProductPage()
        // Set in cypress.json as env setting

cy.log(Cypress.env('url'))
cy.log(Cypress.env('hello'))   
cy.log(Cypress.env())
        cy.visit(Cypress.env('url'))
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEditBox().should('have.attr','minlength','2')
        homePage.getEntrepreneaur().should('be.disabled')
        homePage.getShopTab().click()

        // Use data.name to use data from example file loaded in before()
        // cy.get(':nth-child(1) > .form-control').type(this.data.name)
        // cy.get('select').select(this.data.gender)
        // // Check that Name is also in Two-way Data Binding example
        // cy.get(':nth-child(4) > .ng-valid').should('have.value', this.data.name);
        // // Check the required length is two or more characters
        // cy.get(':nth-child(1) > .form-control').should('have.attr', 'minlength', '2');
        // // Check that radio buton is disabled
        // cy.get('#inlineRadio3').should('be.disabled');
        // // Click the Shop button at the top of the page
        // cy.get(':nth-child(2) > .nav-link').click()
        // Add Products to cart
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)            
        });
        // cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link').click()
        homePage.checkOutButton().click()
        // Check checkout totals
        var sum=0
        cy.get('tr td:nth-child(4) > strong').each(($el, index, $list) => {
            const actualText=$el.text()
            var res=actualText.split(' ')
            res=res[1].trim()
            cy.log(res)
            sum=Number(sum+Number(res));
        }).then(function(){
            // Wait until .each is complete
            cy.log(sum)
        })
        cy.get('h3 > strong').then(function(element){
            const amount=element.text()
            var res=amount.split(' ')
            res=Number(res[1].trim())
            cy.log(res)
            expect(sum).to.equal(res)
        })

        productPage.checkOutButton().click()

        // Enter delivery Country
        // Change timeout from default for this block only
        // Cypress.config('defaultCommandTimeout', 10000)
        cy.get('#country').type('United States')
        cy.wait(4000)
        cy.get('.suggestions > ul > li > a').click()
        // Click "Agree with Terms and Conditions"
        // Since checkbox is covered with dropdown, use {force:true}
        cy.get('.checkbox > label').click({force:true})
        // Click Purchase button
        cy.get('.ng-untouched > .btn').click()
        // Verify success message
        // cy.get('.alert').should('have.text','Success! Thank you! Your order')
        cy.get('.alert').then(function(element)
            {
                const actualText=element.text()
                // Assertion if alert text contains 'Success'
                expect(actualText.includes('Success')).to.be.true
            })
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