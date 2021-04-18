describe('Footer', () => {
  describe('When visiting the home page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should display the footer and the footer bar', () => {
      cy.get('[data-testid="footer"]').should('have.length', 1);
      cy.get('[data-testid="footer-bar"]').should('have.length', 1);
    });

    it('should display the correct Breadcrumbs', () => {
      cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home');
    });

    describe('when clicking on the favorite link', () => {
      it('should navigate to the favorite page', () => {
        // Click favorite link
        cy.get('[data-testid="footer-bar"]')
          .find('a')
          .contains('FAVORITES')
          .click();

        cy.url().should('equal', 'http://localhost:3000/favorites');
      });
    });

    it('should display the footer text', () => {
      cy.get('[data-testid="footer-rights"]').should(
        'have.text',
        'GITHUBFOODUBLIN ©2020BYJDMIGUEL',
      );
    });

    it('should render the correct href of the github link', () => {
      cy.get('[data-testid="footer-rights"]')
        .find('a')
        .contains('GITHUB')
        .should('have.attr', 'href', 'https://github.com/jdmiguel/foodublin');
    });

    it('should render the correct href of the jdmiguel link', () => {
      cy.get('[data-testid="footer-rights"]')
        .find('a')
        .contains('JDMIGUEL')
        .should('have.attr', 'href', 'https://jdmiguel.netlify.app/');
    });
  });

  describe('When visiting the search page', () => {
    it('should display the correct Breadcrumbs', () => {
      cy.visit('/search/dundrum/indian');

      cy.get('[data-testid="breadcrumbs"]').should(
        'have.text',
        'Home>Indian in Dundrum',
      );
    });

    describe('when clicking on the first breadcrumb', () => {
      it('should navigate to the home page', () => {
        // Click breadcrumb link
        cy.get('[data-testid="breadcrumbs"]')
          .find('a')
          .contains('Home')
          .click();

        cy.url().should('equal', 'http://localhost:3000/');
      });
    });
  });

  describe('When visiting the detail page', () => {
    it('should display the correct Breadcrumbs', () => {
      cy.visit('/detail/16518534/bunsen');

      cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>Bunsen');
    });

    describe('when clicking on the first breadcrumb', () => {
      it('should navigate to the home page', () => {
        // Click breadcrumb link
        cy.get('[data-testid="breadcrumbs"]')
          .find('a')
          .contains('Home')
          .click();

        cy.url().should('equal', 'http://localhost:3000/');
      });
    });
  });

  describe('When visiting the favorites page', () => {
    it('should display the correct Breadcrumbs', () => {
      cy.visit('/favorites');

      cy.get('[data-testid="breadcrumbs"]').should(
        'have.text',
        'Home>Favorites',
      );
    });

    describe('when clicking on the first breadcrumb', () => {
      it('should navigate to the home page', () => {
        // Click breadcrumb link
        cy.get('[data-testid="breadcrumbs"]')
          .find('a')
          .contains('Home')
          .click();

        cy.url().should('equal', 'http://localhost:3000/');
      });
    });
  });
});
