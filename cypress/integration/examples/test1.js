/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
 //       cy.wait(2000)
        // Excludes hidden .product
        cy.get('.product:visible').should('have.length',4)
        // Use parent (.products) to scope children
        // Alias the .products locator to a pseudo-variable called productLocator
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length',4)
        // Use .eq to get the second element
        // get and find are used to set scope
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click();
        // will search entire page becuase there is no scoping
        // cy.contains('ADD TO CART')
        // .each will iterate
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            // Use h4 tag to reduce scope
            const textVeg=$el.find('h4.product-name').text()
            // If test includes Cashews
            if(textVeg.includes('Cashews')) {
                // Why does click have a strikethrough?
                $el.find('button').click()
            }
        })

        // Assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')

        // Need to take care of prmoise myself using .then
        // because .text is not a Cypress command; it's jQuery method.
        cy.get('.brand').then(function(logoelement){
            cy.log(logoelement.text())
        })
    })
})