export class WebTablePage {
  get addBtn() {
    return cy.contains("Add");
  }

  get firstNameInput() {
    return cy.get("#firstName");
  }

  get lastNameInput() {
    return cy.get("#lastName");
  }

  get ageInput() {
    return cy.get("#age");
  }

  get emailInput() {
    return cy.get("#userEmail");
  }

  get salaryInput() {
    return cy.get("#salary");
  }

  get departmentInput() {
    return cy.get("#department");
  }

  get submitBtn() {
    return cy.contains("Submit");
  }

  get cell() {
    return cy.get('div[role="gridcell"]');
  }

  visit() {
    cy.visit("https://demoqa.com/elements");
    cy.contains("Web Tables").click();
  }

  addNewData(firstName, lastName, age, email, salary, department) {
    this.addBtn.click();
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.ageInput.type(age);
    this.emailInput.type(email);
    this.salaryInput.type(salary);
    this.departmentInput.type(department);
    this.submitBtn.click();
  }
  verifyNewRowAdded() {
    cy.get(":nth-child(4) > .rt-tr").each(($value) => {
      cy.wrap($value)
        .invoke("text")
        .then((text2) => {
          cy.log(text2);
        });
    });
  }
}
