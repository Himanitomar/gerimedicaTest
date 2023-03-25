class toolTip {
  visitHover() {
    cy.visit("https://demoqa.com/");
    cy.get(":nth-child(4) > :nth-child(1) > .card-body > h5").click();
  }

  tooltip() {
    cy.get("#toolTipButton").trigger("mouseover");
    cy.get("#toolTip").should("contain", "You hovered over the button");
  }
}

export const hoverToolTip = new toolTip();
