/// <reference types="Cypress" />

describe('My First Test Site', function()
{
    it('My First Test Case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    // Get the second column in the table
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
        const text=$el.text()
        // Find the row in the table
        if(text.includes('Python')){
            // Since .next sybiling only works on .get
            // Need to issue a new .get with the index of the row where the value was found
            // Cannot use .text() since .next is jQuery method. Need use .then and save as variable
            cy.get('tr td:nth-child(2)').eq(index).next().then(function(price){
                const priceText = price.text()
                expect(priceText).to.equal('25')
            })
        }
    })
})
})