describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains('Monday');
  });

  it("should book an inter", () => {
    cy.get("img[alt='Add']")
      .first()
      .click();
    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones");
    cy.get("img[alt='Sylvia Palmer']")
      .click();
    cy.get("button").contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  });

  it("should book an inter", () => {
    cy.get("img[alt='Edit']")
      .first()
      .click({ force: true });
    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Lydia Miller-Jones");
    cy.get("img[alt='Tori Malcolm']")
      .click();
    cy.get("button").contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Tori Malcolm")
  });

  it.only("should book an inter", () => {
    cy.get("img[alt='Delete']")
      .first()
      .click({ force: true });
    cy.get('button').contains('Confirm')
      .click()
    cy.contains("Cancelling");
    cy.contains("Cancelling").should("not.exist");
    cy.contains(".appointment__card--show").should("not.exist");
  });

});