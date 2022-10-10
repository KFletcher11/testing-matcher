let GBP;
let BTC;

describe("Test account switching", () => {
    it("Switches account to Andrea", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("User:")
            .parent()
            .find("select")
            .select("Andrea")
            .should("have.value", "Andrea");
    });
    it("Switches account to Bob", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("User:")
            .parent()
            .find("select")
            .select("Bob")
            .should("have.value", "Bob");
    });
    it("Switches account to Catherine", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("User:")
            .parent()
            .find("select")
            .select("Catherine")
            .should("have.value", "Catherine");
    });
    it("Switches account to Doug", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("User:")
            .parent()
            .find("select")
            .select("Doug")
            .should("have.value", "Doug");
    });
    it("Switches account to Elliott", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("User:")
            .parent()
            .find("select")
            .select("Elliott")
            .should("have.value", "Elliott");
    });
});

describe("switch currency", () => {
    it("changes to GBP", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("GBP")
            .should("have.value", "GBP");
    });
    it("changes to BTC", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC")
            .should("have.value", "BTC");
    });
});

describe("test amount in top up, using GBP", () => {
    it("tests the value 0", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("0");

        cy.contains("Top Up")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
    it("Tops up GBP with 10", () => {
        //cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("GBP:")
            .wait(1000)
            .then(($GBP) => {
                GBP = $GBP.text().replace("GBP: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("10");

                cy.contains("Top Up")
                    .click()
                    .then(() => {
                        cy.log(GBP);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("GBP: " + (Number(GBP) + 10));
            });
    });
    it("tests the value -10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Top Up")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
});

describe("test amount in top up, using BTC", () => {
    it("tests the value 0", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("BTC:")
            .wait(1000)
            .then(($BTC) => {
                BTC = $BTC.text().replace("BTC: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("0");

                cy.contains("Top Up")
                    .click()
                    .then(() => {
                        cy.log(BTC);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("Amount error: must be positive")
            });
    });
    it("Tops up with 10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("BTC:")
            .wait(1000)
            .then(($BTC) => {
                BTC = $BTC.text().replace("BTC: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("10");

                cy.contains("Top Up")
                    .click()
                    .then(() => {
                        cy.log(BTC);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("BTC: " + (Number(BTC) + 10));
            });
    });
    it("tests the value -10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Top Up")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
});

describe("test amount in withdraw, using GBP", () => {
    it("tests the value 0", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("0");

        cy.contains("Withdraw")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
    it("Withdraw GBP with 10", () => {
        //cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("GBP:")
            .wait(1000)
            .then(($GBP) => {
                GBP = $GBP.text().replace("GBP: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("10");

                cy.contains("Withdraw")
                    .click()
                    .then(() => {
                        cy.log(GBP);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("GBP: " + (Number(GBP) - 10));
            });
    });
    it("tests the value -10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Withdraw")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
});

describe("test amount in Withdraw, using BTC", () => {
    it("tests the value 0", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("BTC:")
            .wait(1000)
            .then(($BTC) => {
                BTC = $BTC.text().replace("BTC: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("0");

                cy.contains("Withdraw")
                    .click()
                    .then(() => {
                        cy.log(BTC);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("Amount error: must be positive")
            });
    });
    it("Withdraw with 10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("BTC:")
            .wait(1000)
            .then(($BTC) => {
                BTC = $BTC.text().replace("BTC: ", "");

                cy.contains("User details")
                    .parent()
                    .contains("Amount:")
                    .parent()
                    .find("input")
                    .type("10");

                cy.contains("Withdraw")
                    .click()
                    .then(() => {
                        cy.log(BTC);
                    });

                cy.contains("User details")
                    .parent()
                    .contains("BTC: " + (Number(BTC) - 10));
            });
    });
    it("tests the value -10", () => {
        cy.visit("http://localhost:3000");
        cy.contains("User details")
            .parent()
            .contains("Currency:")
            .parent()
            .find("select")
            .select("BTC");
        cy.contains("User details")
            .parent()
            .contains("Amount:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Withdraw")
            .click();
        cy.contains("User details")
            .parent()
            .contains("Amount error: must be positive")
    });
});

describe("order form action", () => {
    it("tests the buy action", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Order Form")
            .parent()
            .contains("Action")
            .parent()
            .find("select")
            .select("Buy");
    });
    it("tests the sell action", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Order Form")
            .parent()
            .contains("Action")
            .parent()
            .find("select")
            .select("Sell");
    });
});

describe.only("order form price", () => {
    beforeEach( () => {
        cy.visit("http://localhost:3000");
        cy.contains("Order Form")
            .parent()
            .contains("Volume:")
            .parent()
            .find("input")
            .type("10");
       
    });
    it("tests with 0", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Price:")
            .parent()
            .find("input")
            .type("0");

        cy.contains("Submit")
            .click();
        cy.contains("Order Form")
            .parent()
            .contains("Price error: must be positive")
    });
    it("tests with 10", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Price:")
            .parent()
            .find("input")
            .type("10");

        cy.contains("Submit")
            .click();
        cy.contains("Aggregated order book").parent().find(".listItem:first").contains("10");
            //.contains("Price error: must be positive")
    });
    it("tests with -10", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Price:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Submit")
            .click();
        cy.contains("Order Form")
            .parent()
            .contains("Price error: must be positive")
    });
});  

describe.only("order form volume", () => {
    beforeEach( () => {
        cy.visit("http://localhost:3000");
        cy.contains("Order Form")
            .parent()
            .contains("Price:")
            .parent()
            .find("input")
            .type("10");
       
    });
    it("tests with 0", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Volume:")
            .parent()
            .find("input")
            .type("0");

        cy.contains("Submit")
            .click();
        cy.contains("Order Form")
            .parent()
            .contains("Volume error: must be positive")
    });
    it("tests with 10", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Volume:")
            .parent()
            .find("input")
            .type("10");

        cy.contains("Submit")
            .click();
            //.contains("Price error: must be positive")
        cy.contains("Aggregated order book").parent().find(".listItem:first").contains("10");
    });
    it("tests with -10", () => {
        cy.contains("Order Form")
            .parent()
            .contains("Volume:")
            .parent()
            .find("input")
            .type("-10");

        cy.contains("Submit")
            .click();
        cy.contains("Order Form")
            .parent()
            .contains("Volume error: must be positive")
    });
});