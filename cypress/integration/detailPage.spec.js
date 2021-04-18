describe('DetailPage', () => {
  beforeEach(() => {
    cy.visit('/detail/16518534/bunsen');

    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');
  });

  it('should display the image, texts and button of the detail header', () => {
    cy.get('[data-testid="detail-header"]')
      .find('h2')
      .should('have.text', 'Bunsen');

    cy.get('[data-testid="detail-header"]')
      .find('h3')
      .should('have.text', 'South City West');

    cy.get('@headerButton').should('have.text', 'favorite_borderunsaved');
  });

  describe('when clicking on the button of the detail header', () => {
    it('should change the button mode to saved', () => {
      // Click header button
      cy.get('@headerButton').click();

      cy.get('@headerButton').should('have.text', 'favoritesaved');
    });
  });
});
