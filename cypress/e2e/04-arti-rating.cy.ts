describe("Arti Rating", () => {
  it("rating listing page loads", () => {
    cy.visit("/artiRating");
    cy.waitForAnimations();
    cy.get("h1").should("be.visible");
  });

  it("renders search input", () => {
    cy.visit("/artiRating");
    cy.get("input[type='text'], input[placeholder]").should("exist");
  });

  it("typing in search updates the URL", () => {
    cy.visit("/artiRating");
    cy.get("input[type='text'], input[placeholder]").first().type("voer");
    cy.wait(600);
    cy.url().should("include", "search=voer");
  });

  it("rating cards link to detail pages", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().then(($link) => {
      cy.wrap($link).click();
      cy.url().should("include", "/artiRating/");
      cy.url().should("not.eq", Cypress.config("baseUrl") + "/artiRating");
    });
  });

  it("rating detail renders product title", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().click();
    cy.waitForAnimations();
    cy.get("h1").should("be.visible").and("not.be.empty");
  });

  it("rating detail shows the rating section", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().click();
    cy.waitForAnimations();
    // Rating bones or rating container
    cy.contains("Beoordeeld door").should("be.visible");
  });

  it("back button navigates to rating listing", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().click();
    cy.waitForAnimations();
    cy.contains("Terug naar overzicht").click();
    cy.url().should("include", "/artiRating");
  });

  it("rating detail hero image is visible", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().click();
    cy.waitForAnimations();
    cy.get("img").should("be.visible");
  });

  it("promo banner is shown at the bottom of detail page", () => {
    cy.visit("/artiRating");
    cy.get("a[href^='/artiRating/']").first().click();
    cy.waitForAnimations();
    cy.scrollTo("bottom");
    // Either PartnerBanner or PromoCodeHondenShop should be present
    cy.get("[class*='banner'], [class*='promo'], a[href*='hondenshop'], a[href*='/partners/']").should("exist");
  });
});
