describe('Finder:searchButton', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-testid=finder]')
      .find('button')
      .contains('Search')
      .as('searchButton');
    cy.get('[data-testid=dropdown]').first().as('locationsDropdown');
    cy.get('[data-testid=dropdown]').last().as('cuisinesDropdown');
  });

  describe('When clicking the search button', () => {
    it('should display the line loader and change the button to loader mode', () => {
      cy.get('@searchButton').click();

      cy.get('[data-testid=line-loader]').should('be.visible');
      cy.get('@searchButton')
        .should('not.contain', 'Search')
        .get('[data-testid=circle-loader]')
        .should('have.length', 1);
    });

    it('should navigate to search page and show the related restaurants', () => {
      cy.get('@searchButton').click();

      cy.url().should('equal', 'http://localhost:3000/search/dublin/any-food');
    });

    describe('after selecting a location', () => {
      it('should navigate to search page with the correct location path', () => {
        cy.get('@locationsDropdown').click();

        cy.get('@locationsDropdown')
          .find('[role="option"]')
          .contains('Temple Bar')
          .click();

        cy.get('@searchButton').click();

        cy.url().should(
          'equal',
          'http://localhost:3000/search/temple-bar/any-food',
        );
      });
    });

    describe('after selecting a cuisine', () => {
      it('should navigate to search page with the correct cuisine path', () => {
        cy.get('@cuisinesDropdown').click();

        cy.get('@cuisinesDropdown')
          .find('[role="option"]')
          .contains('Asian')
          .click();

        cy.get('@searchButton').click();

        cy.url().should('equal', 'http://localhost:3000/search/dublin/asian');
      });
    });

    describe('after selecting a location and a cuisine', () => {
      it('should navigate to search page with the correct location and cuisine paths', () => {
        cy.get('@locationsDropdown').click();

        cy.get('@locationsDropdown')
          .find('[role="option"]')
          .contains('Temple Bar')
          .click();

        cy.get('@cuisinesDropdown').click();

        cy.get('@cuisinesDropdown')
          .find('[role="option"]')
          .contains('Asian')
          .click();

        cy.get('@searchButton').click();

        cy.url().should(
          'equal',
          'http://localhost:3000/search/temple-bar/asian',
        );
      });
    });
  });
});
