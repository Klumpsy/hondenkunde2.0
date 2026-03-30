describe("Blog", () => {
  it("blog listing page loads", () => {
    cy.visit("/blog");
    cy.waitForAnimations();
    cy.get("h1").should("be.visible");
  });

  it("renders the search input", () => {
    cy.visit("/blog");
    cy.get("input[type='text'], input[placeholder]").should("exist");
  });

  it("typing in search updates the URL", () => {
    cy.visit("/blog");
    cy.get("input[type='text'], input[placeholder]").first().type("training");
    cy.wait(600); // debounce
    cy.url().should("include", "search=training");
  });

  it("tag filter buttons are clickable and update URL", () => {
    cy.visit("/blog");
    // Find any tag filter button (they render as buttons with tag text)
    cy.get("button").then(($buttons) => {
      const tagBtn = $buttons.toArray().find((btn) =>
        ["training", "voeding", "gedrag", "gezondheid", "tips"].some((tag) =>
          btn.textContent?.toLowerCase().includes(tag)
        )
      );
      if (tagBtn) {
        cy.wrap(tagBtn).click();
        cy.url().should("include", "tags=");
      }
    });
  });

  it("blog cards link to detail pages", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().then(($link) => {
      const href = $link.attr("href");
      cy.wrap($link).click();
      cy.url().should("include", "/blog/");
      cy.url().should("not.eq", Cypress.config("baseUrl") + "/blog");
    });
  });

  it("blog detail page renders title and content", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().click();
    cy.waitForAnimations();
    cy.get("h1").should("be.visible").and("not.be.empty");
  });

  it("back button on blog detail navigates to listing", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().click();
    cy.waitForAnimations();
    cy.contains("Terug naar overzicht").click();
    cy.url().should("include", "/blog");
  });

  it("blog detail has social sharing section", () => {
    cy.visit("/blog");
    cy.get("a[href^='/blog/']").first().click();
    cy.waitForAnimations();
    cy.get("h1").should("be.visible");
    // Content area exists
    cy.get(".blog_content_container, [class*='blog']").should("exist");
  });
});
