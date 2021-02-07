import { HIGHLIGHTED_RESTAURANTS } from '@/store/statics';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the header with the finder', () => {
    cy.get('header').should('have.length', 1);
    cy.get('[data-testid="finder"]').should('have.length', 1);
  });

  describe('When clicking search button', () => {
    beforeEach(() => {
      cy.get('[data-testid=finder]').as('finder');
      cy.get('[data-testid=finder]')
        .find('button')
        .contains('Search')
        .as('searchButton');
      cy.get('[data-testid=dropdown]').as('dropdown');
    });

    it('displays the line loader and changes the button to loader mode', () => {
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
      it('should navigate to search page with the location selected', () => {
        cy.get('@dropdown').first().click();

        cy.get('@dropdown')
          .first()
          .get('[role="option"]')
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
      it('should navigate to search page and show the related restaurants', () => {
        cy.get('@dropdown').last().click();

        cy.get('@dropdown')
          .last()
          .get('[role="option"]')
          .contains('Asian')
          .click();

        cy.get('@searchButton').click();

        cy.url().should('equal', 'http://localhost:3000/search/dublin/asian');
      });
    });

    describe('after selecting a location and a cuisine', () => {
      it('should navigate to search page and show the related restaurants', () => {
        cy.get('@dropdown').first().click();

        cy.get('@dropdown')
          .first()
          .get('[role="option"]')
          .contains('Temple Bar')
          .click();

        cy.get('@dropdown').last().click();

        cy.get('@dropdown')
          .last()
          .get('[role="option"]')
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

  it('should display the highlights title', () => {
    cy.get('[data-testid="highlights"]')
      .find('h3')
      .should('have.text', 'Featured restaurants');
  });

  it('should display the highlights cards', () => {
    cy.get('footer').scrollIntoView({ duration: 1000, easing: 'linear' });

    cy.get('[data-testid="card"]').should('have.length', 6);

    cy.wrap(HIGHLIGHTED_RESTAURANTS).each((highlight, index) => {
      cy.get('[data-testid="card"]').eq(index).as('highlight');

      cy.get('@highlight')
        .find('img')
        .should('have.attr', 'alt', highlight.title)
        .should('have.attr', 'src', highlight.featuredSrc);

      cy.get('@highlight').find('h4').should('have.text', highlight.title);

      cy.get('@highlight').find('p').should('have.text', highlight.content);
    });
  });

  it('should display the footer with the correct Breadcrumbs', () => {
    cy.get('footer').should('have.length', 1);

    cy.get('[data-testid="breadcrumbs"]')
      .should('have.length', 1)
      .find('div')
      .should('have.length', 1)
      .should('have.text', 'Home');
  });
});
