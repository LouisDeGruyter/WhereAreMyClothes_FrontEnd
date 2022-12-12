describe("mijn eerste test", () => {
  it('draait de applicatie', () => {
    cy.visit('http://localhost:3000');
  });
});

describe("Test submit knop", () => {
  it('klikt op de submit knop', () => {
    cy.visit('http://localhost:3000/kleren/add');
    cy.get('[data-cy=submit_kledingstuk]').click();
  });
});
