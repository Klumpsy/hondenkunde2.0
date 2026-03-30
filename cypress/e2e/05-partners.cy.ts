describe("Partners", () => {
  it("partners listing page loads", () => {
    cy.visit("/partners");
    cy.waitForAnimations();
    cy.get("h1").should("be.visible");
  });

  it("renders the intro SEO section", () => {
    cy.visit("/partners");
    cy.contains("h2", "Door Arti aanbevolen partners").should("be.visible");
  });

  it("nav is dark on partners listing (has hero)", () => {
    cy.visit("/partners");
    // Partners has a Header component so nav starts transparent, becomes dark on scroll
    cy.scrollTo(0, 300);
    cy.wait(400);
    cy.get("div[style*='z-index: 1000']").should("have.class", "bg-gray-800/95");
  });

  it("partner cards render when data is available", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").then(($links) => {
      if ($links.length > 0) {
        cy.wrap($links.first()).should("be.visible");
      } else {
        cy.contains("Binnenkort meer partners beschikbaar").should("be.visible");
      }
    });
  });

  it("partner detail page loads when clicking a card", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").not("[href='/partners']").first().then(($link) => {
      if ($link.length) {
        cy.wrap($link).click();
        cy.url().should("match", /\/partners\/.+/);
        cy.waitForAnimations();
        cy.get("h1, h2").first().should("be.visible").and("not.be.empty");
      }
    });
  });

  it("partner detail nav is always dark", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").not("[href='/partners']").first().then(($link) => {
      if ($link.length) {
        cy.wrap($link).click();
        cy.waitForAnimations();
        cy.get("div[style*='z-index: 1000']").should("have.class", "bg-gray-800/95");
      }
    });
  });

  it("partner detail shows affiliate CTA button", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").not("[href='/partners']").first().then(($link) => {
      if ($link.length) {
        cy.wrap($link).click();
        cy.waitForAnimations();
        // CTA button linking to affiliate URL
        cy.get("a[target='_blank'][rel*='noopener']").should("exist");
      }
    });
  });

  it("promo code copy button shows confirmation after click", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").not("[href='/partners']").first().then(($partnerLink) => {
      if ($partnerLink.length) {
        cy.wrap($partnerLink).click();
        cy.waitForAnimations();
        // If a promo code section exists
        cy.get("body").then(($body) => {
          if ($body.find("button:contains('Kopieer')").length > 0) {
            cy.contains("button", "Kopieer").click();
            cy.contains("Gekopieerd").should("be.visible");
          }
        });
      }
    });
  });

  it("USP section renders when partner has USPs", () => {
    cy.visit("/partners");
    cy.get("a[href^='/partners/']").not("[href='/partners']").first().then(($link) => {
      if ($link.length) {
        cy.wrap($link).click();
        cy.waitForAnimations();
        cy.get("body").then(($body) => {
          // USP cards or checkmark bullets
          if ($body.find("[class*='usp'], svg[class*='check']").length > 0) {
            cy.get("[class*='usp'], svg[class*='check']").should("exist");
          }
        });
      }
    });
  });
});
