describe('Footer', () => {
  describe('When visiting home page', () => {
    it('should display the correct Breadcrumbs', () => {
      cy.visit('/');

      cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home');
    });
  });

  describe('When visiting search page', () => {
    it('should display the correct Breadcrumbs', () => {
      cy.visit('/search/dundrum/indian');

      cy.get('[data-testid="breadcrumbs"]').should(
        'have.text',
        'Home>Indian in Dundrum',
      );
    });
  });
});
