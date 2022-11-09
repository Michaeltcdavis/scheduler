describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains('[data-testid]', 'Tuesday')
      .click()
    cy.contains('[data-testid]', 'Tuesday').should('have.class', 'day-list__item--selected');
  });

});