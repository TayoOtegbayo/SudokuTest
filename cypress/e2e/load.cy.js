///<reference types="Cypress" />

describe("Timer", () => {
  it("test", () => {
    cy.visit("/");
    for (let i = 0; i < 10; i++) {
      cy.contains(".status__time", `00:0${i}`);
      /*    cy.contains(".status__time", "00:02");
      cy.contains(".status__time", "00:03");
      cy.contains(".status__time", "00:04");
      cy.contains(".status__time", "00:05");
      cy.contains(".status__time", "00:06");
      cy.contains(".status__time", "00:07");
      cy.contains(".status__time", "00:08");
      cy.contains(".status__time", "00:09");
      cy.contains(".status__time", "00:10");*/
    }
  });

  it("Hints", () => {
    cy.visit("/");
    cy.get(".game__cell");
    cy.get(".game__cell.game__cell--filled").should("have.length", 45);
    cy.get(".game__cell")
      .not(".game__cell--filled")
      .each(($cell) => {
        cy.wrap($cell).click();
        cy.get(".status__action-hint").click();
      });
    cy.contains(".overlay__text", "You solved it").should("be.visible");
  });

  it("Change the play mode", () => {
    cy.visit("/");
    cy.get(".status__difficulty-select").should("have.value", "Easy");
    cy.get(".game__cell--filled")
      .should("have.length.greaterThan", 40)
      .and("have.length.lessThan", 81)
      .its("length")
      .as("easyN");

    cy.get(".status__difficulty-select").select("Medium");
    cy.get(".game__cell--filled")
      .should("have.length.lessThan", 81)
      .its("length")
      .as("mediumN");

    cy.get(".status__difficulty-select").select("Hard");
    cy.get(".game__cell--filled")
      .should("have.length.lessThan", 81)
      .its("length")
      .as("hardN")
      .then(function () {
        expect(this.easyN, "easy").to.be.greaterThan(this.mediumN);
        expect(this.mediumN, "medium").to.be.greaterThan(this.hardN);
      });
  });

  it.only("Timer: shows minutes and seconds since the game started", () => {
    cy.clock();
    cy.visit("/");
    cy.contains(".status__time", "00:00");
    cy.tick(30_000);
    cy.contains(".status__time", "00:30");
    /*cy.tick(30000);
    cy.contains(".status__time", "01:00");
    cy.tick(640000);
    cy.contains(".status__time", "11:40");*/
  });
});
