class FormPage {
  visit() {
    cy.visit("https://demoqa.com");
    cy.get(".category-cards > :nth-child(2)").click();
    cy.get(":nth-child(2) > .element-list > .menu-list > #item-0").click();
  }

  fillForm(data) {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#userEmail").type(data.email);
    cy.get(
      "#genterWrapper > .col-md-9 > :nth-child(1) > .custom-control-label"
    ).click();
    data.gender === "Male"
      ? cy.get("#gender-radio-1").check()
      : cy.get("#gender-radio-2").check();
    cy.get("#userNumber").type(data.mobile);
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__month-select").select(data.dateOfBirth.month);
    cy.get(".react-datepicker__year-select").select(data.dateOfBirth.year);
    cy.get(`.react-datepicker__day--0${data.dateOfBirth.day}`).click();
    cy.get("#subjectsInput").type(data.subjects).type("{enter}");
    cy.get('input[type="checkbox"]').eq(1).check({ force: true });
    cy.get("input[type=file]").attachFile("demoFile.png");
    //Commenting below as not able to access due to ads on website
    //   cy.get('#stateCity-wrapper').click()
    //   cy.get('#react-select-3-option-0').click()
    //   cy.get('#react-select-4-option-0').click()
    cy.get("#submit").click({ force: true });
  }

  verifyFormSubmittedSuccessfully(data) {
    cy.get(".table").should("contain", `${data.firstName} ${data.lastName}`);
    cy.get(".table").should("contain", data.email);
    cy.get(".table").should("contain", data.gender);
    cy.get(".table").should("contain", data.mobile);
  }
}

export const formPage = new FormPage();
