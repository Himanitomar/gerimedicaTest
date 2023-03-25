class dragDrop {
  dragAndDrop() {
    cy.visit("https://demoqa.com/interaction");
    cy.get(":nth-child(5) > .element-list > .menu-list > #item-3").click();

    cy.get("#draggable").move({ deltaX: 206, deltaY: 47 });
  }
}

export const dragElement = new dragDrop();
