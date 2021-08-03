// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add("selectProduct", (productName) => { 
    cy.get('h4.card-title').each(($el, index, $list) => {
        // Find the row in the table
        if($el.text().includes(productName))
            // Since .next sybiling only works on .get
            // Need to issue a new .get with the index of the row where the value was found
            // Cannot use .text() since .next is jQuery method.
        {
            cy.get('button.btn.btn-info').eq(index).click()
        }
        })
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... 