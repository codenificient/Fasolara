describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("");

    cy.get('[data-cy="loginEmail"]').should("have.attr", "type", "email");

    cy.get('[data-cy="loginPass"]').should("have.attr", "type", "password");
    cy.get('[data-cy="submit"]').click();

    cy.wait(500);
  });

  it("should navigate to the landing page", async () => {
    // Start from the index page
    cy.get('[data-cy="project-sample"]').should("include", "Projet");
    cy.get('[data-cy="activeProject"]').should("include", "10 Jul 2020");
  });

  it("should navigate to the message page", async () => {
    // Start from the index page
    // Find a link with an href attribute containing "about" and click it
    cy.get('[data-cy="submit"]').click();
    cy.wait(500);

    cy.visit("/message");

    // cy.get('a[href*="message"]').click();

    // // The new url should include "/about"
    cy.url().should("include", "/message");

    // cy.get('[data-cy="loginEmail"]').should("have.attr", "type", "email");

    // cy.get('[data-cy="loginPass"]').should("have.attr", "type", "password");

    // cy.get('[data-cy="submit"]').click();

    // cy.get('[data-cy="project-sample"]').should("include", "Projet");
    // cy.get('[data-cy="activeProject"]').should("include", "10 Jul 2020");
  });
});

export {};
