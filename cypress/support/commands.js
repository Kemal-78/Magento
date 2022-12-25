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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("addtocart", () => {
  cy.get("#ui-id-4").click();
  cy.url().should("contain", "/women.html");
  cy.get("dd > .items > :nth-child(1) > a").click();
  cy.url().should("contain", "/women/tops-women.html");
  cy.get('[class="item product product-item"]')
    .first()
    .find('[id="option-label-size-143-item-167"]')
    .click();
  cy.get('[class="item product product-item"]')
    .first()
    .find('[id="option-label-color-93-item-60"]')
    .click();
  cy.wait(2000);
  cy.get('[class="action tocart primary"]').first().click({ force: true });
  cy.get('[class="counter qty"]').should("be.visible").and("contain.text", "1");
});
