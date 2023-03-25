class editTable{
  editvalue() {
    cy.visit("https://demoqa.com/webtables");
  
    cy.get(".action-buttons #edit-record-1").click();
    cy.get("#firstName").clear().type("Gerimedica");
  
    cy.get("#lastName").clear().type("BV");
  
    cy.get("#submit").click();
    cy.get(".rt-tbody").find(".rt-td").eq(1).contains(".rt-td", "BV");

}
}

export const editTablevalue = new editTable();

// export function ediTable() {
//   cy.visit("https://demoqa.com/webtables");

//   cy.get(".action-buttons #edit-record-1").click();
//   cy.get("#firstName").clear().type("Gerimedica");

//   cy.get("#lastName").clear().type("BV");

//   cy.get("#submit").click();
//   cy.get(".rt-tbody").find(".rt-td").eq(1).contains(".rt-td", "BV");
// }
