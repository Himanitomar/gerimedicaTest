export function visitBrokenLink() {
  cy.contains("Broken Links - Images").click();
}

export function verifyBrokenImage() {
  cy.get('img[src="/images/Toolsqa_1.jpg"]')
    .should("be.visible")
    .and(($img) => expect($img[0].naturalWidth).to.be.eq(0));
}
