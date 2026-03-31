/// <reference types="cypress" />

// Wait for GSAP animations to settle before asserting
Cypress.Commands.add("waitForAnimations", () => {
  cy.wait(600);
});

// Assert the navbar is in dark/solid mode
Cypress.Commands.add("assertNavDark", () => {
  cy.get("nav, [class*='fixed']").first().should("have.class", "bg-gray-800/95").or("have.css", "background-color");
});

declare global {
  namespace Cypress {
    interface Chainable {
      waitForAnimations(): Chainable<void>;
      assertNavDark(): Chainable<void>;
    }
  }
}
