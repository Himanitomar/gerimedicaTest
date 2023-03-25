function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
  
  async function getUserToken(username, password) {
    const response = await cy.request({
      method: "POST",
      url: "https://demoqa.com/Account/v1/GenerateToken",
      failOnStatusCode: false,
      body: {
        userName: username,
        password: password,
      },
    });
    return response.body.token;
  }
  
  describe("API Testing ", function () {
    let username = "johndoe121462fc64a-8978-486c-95fc-5d35ff255808";
    let userId = "2e58224c-7210-4b1f-9997-33a15b43e04e";
    let password = "Hello@12345";
  
    // Happy path
    it("Create user success", () => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/User",
        failOnStatusCode: false,
        body: {
          userName: "johndoe121" + generateUUID(),
          password: password,
        },
      }).as("details");
      //Validate status code
      cy.get("@details").its("status").should("eq", 201);
      cy.get("@details").then((response) => {
        cy.log(JSON.stringify(response.body));
      });
    });
  
    // Existing username errors
    it("Create user existing username", () => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/User",
        failOnStatusCode: false,
        body: {
          userName: "johndoe121",
          password: "Hello@12345",
        },
      }).as("details");
      //Validate status code
      cy.get("@details").its("status").should("eq", 406);
      cy.get("@details").should((response) => {
        expect(response.body.code).to.equal("1204");
        expect(response.body.message).to.equal("User exists!");
      });
    });
  
    // Doesn't work on no username
    it("Create user no username failure", () => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/Account/v1/User",
        failOnStatusCode: false,
        body: {
          password: "Hello@12345",
        },
      }).as("details");
      //Validate status code
      cy.get("@details").its("status").should("eq", 400);
      cy.get("@details").should((response) => {
        expect(response.body.code).to.equal("1200");
        expect(response.body.message).to.equal("UserName and Password required.");
      });
    });
  
    // Unauthorized book list check
    it("Create books list not authenticated", () => {
      cy.request({
        method: "POST",
        url: "https://demoqa.com/BookStore/v1/Books",
        failOnStatusCode: false,
        body: {
          userId: userId,
          collectionOfIsbns: [
            {
              isbn: "randomIsbn1",
            },
            {
              isbn: "randomIsbn2",
            },
          ],
        },
      }).as("details");
      //Validate status code
      cy.get("@details").its("status").should("eq", 401);
      cy.get("@details").should((response) => {
        expect(response.body.code).to.equal("1200");
        expect(response.body.message).to.equal("User not authorized!");
      });
    });
  
    // Create book list success
    it("Create book list", async () => {
      const token = await getUserToken(username, password);
      await cy
        .request({
          method: "POST",
          url: "https://demoqa.com/BookStore/v1/Books",
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
          body: {
            userId: userId,
            collectionOfIsbns: [
              {
                isbn: "isbn1",
              },
              {
                isbn: "isbn2",
              },
            ],
          },
        })
        .as("details");
      //Validate status code
      await cy.get("@details").its("status").should("eq", 201);
    });
  
    // Unauthorized book delete check
    it("Delete book not authenticated", () => {
      cy.request({
        method: "DELETE",
        url: "https://demoqa.com/BookStore/v1/Book",
        failOnStatusCode: false,
        body: {
          userId: userId,
          isbn: "randomIsbn1",
        },
      }).as("details");
      //Validate status code
      cy.get("@details").its("status").should("eq", 401);
      cy.get("@details").should((response) => {
        expect(response.body.code).to.equal("1200");
        expect(response.body.message).to.equal("User not authorized!");
      });
    });
  
    // Delete book when isbn does not exist
    it("Delete book isbn does not exist", async () => {
      const token = await getUserToken(username, password);
      await cy
        .request({
          method: "DELETE",
          url: "https://demoqa.com/BookStore/v1/Book",
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
          body: {
            userId: userId,
            isbn: "NonExistentISBN",
          },
        })
        .as("details");
      //Validate status code
      await cy.get("@details").its("status").should("eq", 400);
      await cy.get("@details").should((response) => {
        expect(response.body.code).to.equal("1206");
        expect(response.body.message).to.equal(
          "ISBN supplied is not available in User's Collection!"
        );
      });
    });
  
    it("Delete book success", async () => {
      const token = await getUserToken(username, password);
      await cy
        .request({
          method: "DELETE",
          url: "https://demoqa.com/BookStore/v1/Book",
          failOnStatusCode: false,
          auth: {
            bearer: token,
          },
          body: {
            userId: userId,
            isbn: "isbn1",
          },
        })
        .as("details");
      //Validate status code
      await cy.get("@details").its("status").should("eq", 204);
    });
  });