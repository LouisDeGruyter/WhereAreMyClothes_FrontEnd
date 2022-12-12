

it("add kledingstuk test", () => {
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