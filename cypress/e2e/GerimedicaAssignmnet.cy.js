import { WebTablePage} from '/Users/himani.t/Documents/Gerimedica/cypress/support/webTablePage.js'
import {brokenLinkPage, verifyBrokenImage, visitBrokenLink} from '/Users/himani.t/Documents/Gerimedica/cypress/support/brokenLinkPage.js'
import { formPage } from '../support/formPage';
import { tooltip, visitHover } from '../support/hoverPage';
import { showStatus } from '../support/progressBar';
import { ediTable } from '../support/editTable';
import { dragAndDrop } from '../support/dragDrop';

describe('Table Functionality', () => {
    Cypress.on('uncaught:exception', () => false);
    const data = {
        firstName: 'Gerimedica',
        lastName: 'BV',
        email: 'test@test.com',
        gender: 'Male',
        mobile: '0123456789',
        dateOfBirth: {
          day: '15',
          month: 'January',
          year: '1990'
        },
        subjects: 'Cypress Assignment',
        currentAddress: 'Netherlands'
      }

  const webTablePage = new WebTablePage()

  beforeEach(() => {
    webTablePage.visit()
  })

  it('Verify user can enter new data into the table', () => {
    webTablePage.addNewData('Alden', 'Cantrell', '30', 'test@test.com', '12345', 'QA')
    webTablePage.verifyNewRowAdded();
  })

  it('Verify Broken Link', () =>{
   visitBrokenLink();
   verifyBrokenImage();
  })

  it('Should submit the form successfully with all required data', () => {
    formPage.visit();
     formPage.fillForm(data);
    formPage.verifyFormSubmittedSuccessfully(data);
  })

  it('Verify progress bar status as 100', ()=> {
    showStatus();
  })

  it('Verify user can edit a row in table', () =>{
    ediTable();
  })

  it.only('Verify Drag and Drop', ()=>{
    dragAndDrop();
  })

  it('Verify tooltip', ()=>{
    // currently not working because advertisemnt on the site are not allowing cypress to access the token
   visitHover();
   tooltip();
  })

})

