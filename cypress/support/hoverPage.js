export function visitHover() {
    cy.visit('https://demoqa.com/');
    cy.get(':nth-child(4) > :nth-child(1) > .card-body > h5').click()
}

export function tooltip() {
  cy.get("#toolTipButton").trigger("mouseover");
  cy.get("#toolTip").should("contain", "You hovered over the button");
}
