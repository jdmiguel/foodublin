import { HIGHLIGHTED_RESTAURANTS, LOCATIONS, CUISINES } from '@/store/statics';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-testid=finder]').as('finder');
    cy.get('[data-testid=finder]')
      .find('button')
      .contains('Search')
      .as('searchButton');
    cy.get('[data-testid=dropdown]').first().as('locationsDropdown');
    cy.get('[data-testid=dropdown]').last().as('cuisinesDropdown');
    cy.get('[data-testid=listbox-wrapper]').last().as('listBox');
  });

  it('should display the header with the finder', () => {
    cy.get('header').should('have.length', 1);
    cy.get('@finder').should('have.length', 1);
  });

  it('should display the correct options of the location dropdown', () => {
    cy.get('@locationsDropdown').click();

    cy.wrap(LOCATIONS).each((location, index) => {
      cy.get('@locationsDropdown')
        .find('[role="option"]')
        .eq(index)
        .as('location');

      cy.get('@location').find('p').should('have.text', location.name);
    });
  });

  it('should display the correct options of the cuisine dropdown', () => {
    cy.get('@cuisinesDropdown').click();

    cy.wrap(CUISINES).each((cuisine, index) => {
      cy.get('@cuisinesDropdown')
        .find('[role="option"]')
        .eq(index)
        .as('cuisine');

      cy.get('@cuisine').find('p').should('have.text', cuisine.name);
      cy.get('@cuisine')
        .find('img')
        .should('have.attr', 'alt', cuisine.name)
        .should('have.attr', 'src', cuisine.iconSrc);
    });
  });

  describe('When typing on the search input', () => {
    it('should display the matched restaurants', () => {
      cy.get('@finder').find('input').type('col');

      cy.get('@listBox').find('[role="option"]').eq(0).as('firstSuggestion');
      cy.get('@listBox').find('[role="option"]').eq(1).as('secondSuggestion');
      cy.get('@listBox').find('[role="option"]').eq(2).as('thirdSuggestion');

      cy.get('@firstSuggestion')
        .find('h4')
        .should('have.text', 'The Bank on College Green');

      cy.get('@firstSuggestion')
        .find('p')
        .should('have.text', 'South City West');

      cy.get('@firstSuggestion')
        .find('img')
        .should('have.attr', 'alt', 'The Bank on College Green')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/res_imagery/16522174_RESTAURANT_246ce7cd6fcdb531a0806c042f032eba.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );

      cy.get('@secondSuggestion')
        .find('h4')
        .should('have.text', "Coletti's Take Away");

      cy.get('@secondSuggestion')
        .find('p')
        .should('have.text', 'Firhouse Shopping Centre, Firhouse');

      cy.get('@secondSuggestion')
        .find('img')
        .should('have.attr', 'alt', "Coletti's Take Away")
        .should('have.attr', 'src', '/images/generic-thumb.png');

      cy.get('@thirdSuggestion')
        .find('h4')
        .should('have.text', 'The Michael Collins');

      cy.get('@thirdSuggestion').find('p').should('have.text', 'Rush');

      cy.get('@thirdSuggestion')
        .find('img')
        .should('have.attr', 'alt', 'The Michael Collins')
        .should('have.attr', 'src', '/images/generic-thumb.png');

      cy.get('@thirdSuggestion').click();

      cy.url().should(
        'equal',
        'http://localhost:3000/detail/16519193/the-michael-collins',
      );
    });

    describe('and clicking on the last suggestion', () => {
      it('should navigate to the correct detail page', () => {
        cy.get('@finder').find('input').type('col');

        cy.get('@listBox').find('[role="option"]').eq(2).click();

        cy.url().should(
          'equal',
          'http://localhost:3000/detail/16519193/the-michael-collins',
        );
      });
    });
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

  describe('When clicking a highlight card', () => {
    it('should navigate to the correct detail page', () => {
      cy.get('[data-testid="card"]').eq(0).click();

      cy.url().should(
        'equal',
        'http://localhost:3000/detail/9100233/cleaver-east',
      );
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
