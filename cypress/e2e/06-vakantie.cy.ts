describe("Vakantie met hond", () => {
  it("page loads with hero header", () => {
    cy.visit("/vakantie-met-hond");
    cy.waitForAnimations();
    cy.get("h1").contains("Vakantie met hond").should("be.visible");
  });

  it("renders the interactive map section heading", () => {
    cy.visit("/vakantie-met-hond");
    cy.contains("h2", "De leukste locaties voor een vakantie met je hond").should("be.visible");
  });

  it("renders the countries grid heading", () => {
    cy.visit("/vakantie-met-hond");
    cy.contains("h2", "Met je hond op vakantie naar:").should("be.visible");
  });

  it("country cards render when data is available", () => {
    cy.visit("/vakantie-met-hond");
    cy.get("a[href^='/vakantie-met-hond/']").then(($links) => {
      if ($links.length > 0) {
        cy.wrap($links.first()).should("be.visible");
      } else {
        cy.contains("Nog geen landen toegevoegd").should("be.visible");
      }
    });
  });

  it("clicking a country card navigates to the country page", () => {
    cy.visit("/vakantie-met-hond");
    cy.get("a[href^='/vakantie-met-hond/']").first().then(($link) => {
      if ($link.length) {
        const href = $link.attr("href") as string;
        cy.wrap($link).click();
        cy.url().should("include", href);
        cy.waitForAnimations();
        cy.get("h1, h2").first().should("be.visible");
      }
    });
  });

  it("renders the SEO info sections at the bottom", () => {
    cy.visit("/vakantie-met-hond");
    cy.scrollTo("bottom");
    cy.contains("Goed voorbereid op vakantie met hond").should("be.visible");
    cy.contains("Benodigdheden wanneer je met hond op vakantie gaat").should("be.visible");
    cy.contains("Handige tips voor vakantie met hond").should("be.visible");
  });

  it("pagination shows when there are multiple pages of countries", () => {
    cy.visit("/vakantie-met-hond");
    cy.get("body").then(($body) => {
      if ($body.find("a[href*='page=']").length > 0) {
        cy.get("a[href*='page=']").should("be.visible");
      }
    });
  });
});
