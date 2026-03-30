describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.waitForAnimations();
  });

  it("renders all 6 nav links", () => {
    const links = ["Home", "Arti's Rating", "Promo's", "Blog", "Vakantie met hond", "Partners"];
    links.forEach((name) => {
      cy.contains("a", name).should("be.visible");
    });
  });

  it("logo navigates to homepage", () => {
    cy.visit("/blog");
    cy.get("a[href='/']").first().click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("highlights the active nav link", () => {
    cy.visit("/blog");
    cy.contains("a", "Blog").should("have.class", "text-orange");
  });

  it("highlights home link when on homepage", () => {
    cy.visit("/");
    cy.contains("a", "Home").should("have.class", "text-orange");
  });

  it("nav is transparent on hero pages at top", () => {
    cy.visit("/");
    cy.get("div[style*='z-index: 1000']").should("have.class", "bg-transparent");
  });

  it("nav becomes dark after scrolling on hero pages", () => {
    cy.visit("/");
    cy.window().then((win) => win.scrollTo(0, 400));
    cy.wait(800);
    cy.get("div[style*='z-index: 1000']").should("have.class", "bg-gray-800/95");
  });

  it("nav is always dark on detail pages without a hero", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().click();
    cy.waitForAnimations();
    cy.get("div[style*='z-index: 1000']").should("have.class", "bg-gray-800/95");
  });

  it("mobile hamburger menu opens on small screens", () => {
    cy.viewport(375, 812);
    cy.visit("/");
    cy.waitForAnimations();
    // Hamburger button is only visible on mobile (md:hidden)
    cy.get("button.inline-flex").click();
    cy.contains("Blog").should("be.visible");
  });

  it("footer renders with links", () => {
    cy.visit("/");
    cy.scrollTo("bottom");
    cy.get("footer").should("exist");
    cy.get("footer").contains("Hondenkunde").should("be.visible");
  });
});
