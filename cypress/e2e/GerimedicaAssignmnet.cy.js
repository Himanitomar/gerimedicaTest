import { WebTablePage } from "/Users/himani.t/Documents/Gerimedica/cypress/support/webTablePage.js";
import {
  brokenLink,
  brokenLinkPage,
  verifyBrokenImage,
  visitBrokenLink,
} from "/Users/himani.t/Documents/Gerimedica/cypress/support/brokenLinkPage.js";
import { formPage } from "../support/formPage";
import { hoverToolTip, tooltip, visitHover } from "../support/hoverPage";
import { progressBarStatus, showStatus } from "../support/progressBar";
import { ediTable, editTablevalue } from "../support/editTable";
import { dragAndDrop, dragElement } from "../support/dragDrop";

describe("Table Functionality", () => {
  Cypress.on("uncaught:exception", () => false);
  const data = {
    firstName: "Gerimedica",
    lastName: "BV",
    email: "test@test.com",
    gender: "Male",
    mobile: "0123456789",
    dateOfBirth: {
      day: "15",
      month: "January",
      year: "1990",
    },
    subjects: "Cypress Assignment",
    currentAddress: "Netherlands",
  };

  const webTablePage = new WebTablePage();

  beforeEach(() => {
    webTablePage.visit();
  });

  it("Verify user can enter new data into the table", () => {
    webTablePage.addNewData(
      "Alden",
      "Cantrell",
      "30",
      "test@test.com",
      "12345",
      "QA"
    );
    webTablePage.verifyNewRowAdded();
  });

  it("Verify Broken Link", () => {
    brokenLink.visitBrokenLink();
    brokenLink.verifyBrokenImage();
  });

  it("Should submit the form successfully with all required data", () => {
    formPage.visit();
    formPage.fillForm(data);
    formPage.verifyFormSubmittedSuccessfully(data);
  });

  it("Verify progress bar status as 100", () => {
    progressBarStatus.showStatus();
  });

  it("Verify user can edit a row in table", () => {
    editTablevalue.editvalue();
  });

  it("Verify Drag and Drop", () => {
    dragElement.dragAndDrop();
  });

  it("Verify tooltip", () => {
    // currently not working because advertisemnt on the site are not allowing cypress to access the token
    hoverToolTip.visitHover();
    hoverToolTip.tooltip();
  });
});
