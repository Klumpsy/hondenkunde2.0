describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForAnimations();
  });

  it("loads successfully", () => {
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("renders the hero header with title", () => {
    cy.get("header").should("be.visible");
    cy.get("h1").contains("Welkom op Hondenkunde.nl").should("be.visible");
  });

  it("hero CTA link points to blog", () => {
    cy.get("header a").should("have.attr", "href", "/blog");
  });

  it("renders the stat cards section", () => {
    // Three metric cards exist on the homepage
    cy.contains("Enthousiasme van honden").should("exist");
    cy.contains("Geteste producten").should("exist");
    cy.contains("Het beste voor jouw hond").should("exist");
  });

  it("renders the 'Over Hondenkunde.nl' section", () => {
    cy.contains("h2", "Over Hondenkunde.nl").should("be.visible");
    cy.contains("Friese stabij").should("exist");
  });

  it("renders the featured blog heading", () => {
    cy.contains("h2", "Uitgelichte Blog").should("be.visible");
  });

  it("renders the featured rating heading", () => {
    cy.contains("h2", "Uitgelichte Rating").should("be.visible");
  });

  it("sitemap.xml is reachable", () => {
    cy.request({ url: "/sitemap.xml", failOnStatusCode: false })
      .its("status")
      .should("be.oneOf", [200, 304]);
  });

  it("robots.txt is reachable and mentions sitemap", () => {
    cy.request({ url: "/robots.txt", failOnStatusCode: false }).then((res) => {
      expect(res.status).to.be.oneOf([200, 304]);
      expect(res.body.toLowerCase()).to.include("sitemap");
    });
  });
});
