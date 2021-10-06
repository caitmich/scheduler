describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.contains("Monday")
  });

  it("should book an interview", () => {
    cy.get('[alt="Add"]')
    .first().click()
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.contains('Save').click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones", "Sylvia Palmer") 
   
  });

  it("should edit and interview", () => {
    cy.get("[alt='Edit']")
      .first()
      .click({force: true})
    cy.get("[alt='Tori Malcolm']").click()
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Caitlin Henry")
    cy.contains('Save').click()
    cy.contains(".appointment__card--show", "Caitlin Henry", "Tori Malcolm") 
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']")
      .first()
      .click({force: true})
    cy.contains('Confirm')
      .click()
    cy.get("[alt='Loading']").should("be.visible")
    cy.contains("Deleting").should("not.exist")
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist")
    
  });

});