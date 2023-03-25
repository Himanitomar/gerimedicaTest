class progressBar {
  showStatus() {
    cy.visit("https://demoqa.com/");

    // Navigate to Widget >> Progress Bar
    cy.contains("Widgets").click();
    cy.contains("Progress Bar").click();

    // Click on start the progress bar
    cy.contains("Start").click();

    // Wait for progress bar to complete
    cy.wait(9000);
    cy.get(".progress-bar")
      //.should('not.have.class', 'bg-info')
      .should("not.have.attr", "aria-valuenow", "0")
      .should("not.have.attr", "aria-valuenow", "undefined")
      .should("have.attr", "aria-valuenow", "100", { timeout: 10000 });

    // Verify the progress bar is 100% with green color
    cy.get(".progress-bar").should("have.class", "bg-success");
  }
}

export const progressBarStatus = new progressBar();
