describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForAnimations();
  });

  it("renders all 6 nav links", () => {
    const links = ["Home", "Arti's Rating", "Promo's", "Blog", "Vakantie met hond", "Partners"];
    links.forEach((name) => {
      cy.contains("a", name).should("exist");
    });
  });

  it("logo navigates to homepage", () => {
    cy.visit("/blog");
    // Scope to the navbar so we click the Logo link, not the off-screen sidebar link
    cy.get("[data-testid='navbar'] a[href='/']").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("highlights the active nav link on blog page", () => {
    cy.visit("/blog");
    // Scope to the navbar element to avoid matching the sidebar's links
    cy.get("[data-testid='navbar']").within(() => {
      cy.contains("a", "Blog").should("have.class", "text-orange");
    });
  });

  it("highlights home link when on homepage", () => {
    cy.visit("/");
    cy.get("[data-testid='navbar']").within(() => {
      cy.contains("a", "Home").should("have.class", "text-orange");
    });
  });

  it("nav starts transparent on hero pages", () => {
    // beforeEach already visits "/" and waits; just assert the stable state
    cy.get("[data-testid='navbar']").should("have.attr", "data-dark", "false");
  });

  it("nav is always dark on non-hero detail pages", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().click();
    cy.url().should("match", /\/blog\/.+/);
    cy.waitForAnimations();
    cy.get("[data-testid='navbar']").should("have.attr", "data-dark", "true");
  });

  it("mobile sidebar opens on hamburger click", () => {
    cy.viewport(375, 812);
    cy.visit("/");
    cy.waitForAnimations();
    cy.get("button.inline-flex").click();
    cy.wait(200);
    cy.get(".sidebar-nav").should("be.visible");
    cy.get(".sidebar-nav").contains("Blog").should("be.visible");
  });

  it("footer renders with site name", () => {
    cy.visit("/");
    cy.scrollTo("bottom");
    cy.get("footer").should("exist");
    cy.get("footer").contains("Hondenkunde").should("be.visible");
  });
});
