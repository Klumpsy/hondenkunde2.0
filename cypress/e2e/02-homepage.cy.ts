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

  it("renders the 3 stat cards", () => {
    cy.get(".anim-stagger").first().within(() => {
      cy.get("h3").should("have.length", 3);
    });
  });

  it("renders the 'Over Hondenkunde.nl' section", () => {
    cy.contains("h2", "Over Hondenkunde.nl").should("be.visible");
    cy.contains("Friese stabij").should("exist");
  });

  it("renders the featured blog section", () => {
    cy.contains("h2", "Uitgelichte Blog").should("be.visible");
  });

  it("renders the featured rating section", () => {
    cy.contains("h2", "Uitgelichte Rating").should("be.visible");
  });

  it("sitemap.xml is accessible", () => {
    cy.request("/sitemap.xml").its("status").should("eq", 200);
  });

  it("robots.txt is accessible", () => {
    cy.request("/robots.txt").its("status").should("eq", 200);
    cy.request("/robots.txt").its("body").should("include", "sitemap.xml");
  });
});
