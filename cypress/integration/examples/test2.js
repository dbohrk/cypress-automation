/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
 
        // Use parent (.products) to scope children
        // Alias the .products locator to a pseudo-variable called productLocator
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            // Use h4 tag to reduce scope
            const textVeg=$el.find('h4.product-name').text()
            // If test includes Cashews
            if(textVeg.includes('Cashews')) {
                // Why does click have a strikethrough?
                $el.find('button').click()
            }
        })

        //Click on shopping cart/bag
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
      //  cy.get('Place Order').click()
      // Using text "Place Order" did not work for some reason
        cy.get(':nth-child(14)').click()

        // Assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')

        // Need to take care of prmoise myself using .then
        // because .text is not a Cypress command; it's jQuery method.
        cy.get('.brand').then(function(logoelement){
            cy.log(logoelement.text())
        })
    })
})