describe('Footer', () => {
  describe('When visiting home page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display the footer with the correct Breadcrumbs', () => {
      cy.get('footer').should('have.length', 1);

      cy.get('[data-testid="breadcrumbs"]')
        .should('have.length', 1)
        .should('have.text', 'Home');
    });
  });
});
