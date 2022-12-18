describe("add kledingstuk test", () => {
    beforeEach(() => {
        cy.login();
    });
    afterEach(() => {
        cy.wait(2000);
    });
    it("add kleerkast test", () => {
        cy.visit("http://localhost:3000/kleerkasten/add");
        cy.get('[data-cy="kleerkast_naam"]').type("Kleerkast 1");
        cy.get('[data-cy="kleerkast_locatie"]').type("kamer");
        cy.get('[data-cy="submit_kleerkast"]').click();
        cy.window().then((win) => {   cy.spy(win.console, "log") })

    });

    it("add kledingstuk test1", () => {
        cy.visit("http://localhost:3000/kleren/add");
        cy.get('[data-cy="brand_input"]').type("Converse");
        cy.get('[data-cy="size_input"]').type(55);
        cy.get('[data-cy=kleerkast_input]').click().then(() => {
            cy.get('div[title="Kleerkast 1"]').click();
        });
        cy.get('[data-cy="color_input"]').type("rood");
    cy.get('[data-cy="type_input"]').type("broek");
    cy.get('[data-cy="submit_kledingstuk"]').click();
    });
it("add kledingstuk test2", () => {
    cy.visit("http://localhost:3000/kleren/add");
    cy.get('[data-cy="brand_input"]').type("merkTest");
    cy.get('[data-cy="size_input"]').type(40);
    cy.get('[data-cy=kleerkast_input]').click().then(() => {
        cy.get('div[title="Kleerkast 1"]').click();
    });

    cy.get('[data-cy="color_input"]').type("rood");
    cy.get('[data-cy="type_input"]').type("broek");
    cy.get('[data-cy="submit_kledingstuk"]').click();
    cy.visit("http://localhost:3000/kleren");
    cy.get("tr").last({force:true}).contains("td", "merkTest");
    });

    it("delete kledingstuk test", () => {
        
        cy.visit("http://localhost:3000/kleren");
        cy.get("[data-cy=remove_kledingstuk]").last({force:true}).click();
        cy.get('.ant-modal:visible').find('.ant-modal-confirm-btns').find('.ant-btn-dangerous').click();
        cy.get("tr").last({force:true}).contains("td", "merkTest").should("not.exist");
    });
    it("maak kledingstuk met verkeerde merk", () => {
        cy.visit("http://localhost:3000/kleren/add");
        cy.get('[data-cy="size_input"]').type(40);
        cy.get('[data-cy=kleerkast_input]').click().then(() => {
            cy.get('div[title="Kleerkast 1"]').click();
        });
    
        cy.get('[data-cy="color_input"]').type("rood");
        cy.get('[data-cy="type_input"]').type("broek");
        cy.get('[data-cy="submit_kledingstuk"]').click();
        cy.get('[data-cy="brand_input"]').find('.ant-form-item-explain').should('have.text', 'Vul een merk in!');

    });
    it("show kledingstukken", () => {
        cy.intercept('GET', 'http://localhost:3000/api/kledingstukken', {fixture: 'kledingstukken.json',},);
        cy.visit('http://localhost:3000/kleren');
        cy.get("tbody").find("tr").first({force:true}).contains("td", "Converse");
        cy.get("tbody").find("tr").first({force:true}).contains("td", "55");
    });
    it("very slow response", () => {
        cy.intercept('GET', 'http://localhost:3000/api/kledingstukken', (req)=> {
            req.on('response', (res) => {
                res.setDelay(1000);
            });
        },).as('slowResponse');
        cy.visit('http://localhost:3000/kleren');
        cy.get('[data-cy=loading]').should('be.visible');
        cy.wait(4000);
        cy.get('[data-cy=loading]').should('not.contain', 'spinning={true}');
    });
    it("delete kledingstuk test", () => {
            
            cy.visit("http://localhost:3000/kleerkasten");
            cy.get("[data-cy=remove_kleerkast]").last({force:true}).click();
            cy.get('.ant-modal:visible').find('.ant-modal-confirm-btns').find('.ant-btn-dangerous').click();
            cy.get("tr").last({force:true}).contains("td", "Kleerkast 1").should("not.exist");
        });

});
