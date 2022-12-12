describe("kledingstuk test", () => {
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
});
