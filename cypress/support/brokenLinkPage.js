class brokenLinkPage {
  visitBrokenLink() {
    cy.contains("Broken Links - Images").click();
  }
  verifyBrokenImage() {
    cy.get('img[src="/images/Toolsqa_1.jpg"]')
      .should("be.visible")
      .and(($img) => expect($img[0].naturalWidth).to.be.eq(0));
  }
}

export const brokenLink = new brokenLinkPage();
