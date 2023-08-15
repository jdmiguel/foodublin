import { LOCATIONS, CUISINES } from '@/store/statics';

describe('Finder', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept(
      'GET',
      'https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&q=col',
      {
        statusCode: 200,
        fixture: 'finderRestaurants.json',
      },
    ).as('getRestaurants');

    cy.intercept(
      'GET',
      'https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&q=woe',
      {
        statusCode: 200,
        fixture: 'finderNoRestaurants.json',
      },
    ).as('getNoRestaurants');

    cy.intercept(
      'GET',
      'https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&q=row',
      {
        statusCode: 500,
      },
    ).as('getRestaurantsError');

    cy.get('[data-testid=finder]').as('finder');
    cy.get('[data-testid=finder]').find('button').contains('Search').as('searchButton');
    cy.get('[data-testid=dropdown]').first().as('areasDropdown');
    cy.get('[data-testid=dropdown]').last().as('cuisinesDropdown');
    cy.get('[data-testid=listbox-wrapper]').last().as('listBox');
  });

  it('should display the header with the finder', () => {
    cy.get('header').should('have.length', 1);
    cy.get('@finder').should('have.length', 1);
  });

  it('should display the correct options of the location dropdown', () => {
    cy.get('@areasDropdown').click();

    cy.wrap(LOCATIONS).each((location, index) => {
      cy.get('@areasDropdown').find('li').eq(index).as('location');

      cy.get('@location').find('p').should('have.text', location.name);
    });
  });

  it('should display the correct options of the cuisine dropdown', () => {
    cy.get('@cuisinesDropdown').click();

    cy.wrap(CUISINES).each((cuisine, index) => {
      cy.get('@cuisinesDropdown').find('li').eq(index).as('cuisine');

      cy.get('@cuisine').find('p').should('have.text', cuisine.name);
      cy.get('@cuisine')
        .find('img')
        .should('have.attr', 'alt', cuisine.name)
        .should('have.attr', 'src', cuisine.iconSrc);
    });
  });

  describe('When typing on the search input', () => {
    describe('and calling the search request successfully, retrieving a list of restaurants', () => {
      beforeEach(() => {
        cy.get('@finder').find('input').type('col');

        cy.wait('@getRestaurants');

        cy.get('@listBox').find('li').eq(0).as('firstSuggestion');
        cy.get('@listBox').find('li').eq(1).as('secondSuggestion');
        cy.get('@listBox').find('li').eq(2).as('thirdSuggestion');
      });

      it('should display the matched restaurants', () => {
        cy.get('@firstSuggestion').find('h4').should('have.text', 'Tutti Frutti');

        cy.get('@firstSuggestion').find('p').should('have.text', 'Town Centre Mall, Swords');

        cy.get('@firstSuggestion')
          .find('img')
          .should('have.attr', 'alt', 'Tutti Frutti')
          .should(
            'have.attr',
            'src',
            'https://b.zmtcdn.com/data/res_imagery/9100465_RESTAURANT_d9cb91300a2dde4403ff422884013f2c_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          );

        cy.get('@secondSuggestion').find('h4').should('have.text', 'Cornucopia');

        cy.get('@secondSuggestion').find('p').should('have.text', 'South City West');

        cy.get('@secondSuggestion')
          .find('img')
          .should('have.attr', 'alt', 'Cornucopia')
          .should(
            'have.attr',
            'src',
            'https://b.zmtcdn.com/data/res_imagery/16521303_RESTAURANT_c6e5a59d49548f7ccfa17cf9d123f74a.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
          );

        cy.get('@thirdSuggestion').find('h4').should('have.text', 'The Michael Collins');

        cy.get('@thirdSuggestion').find('p').should('have.text', 'Rush');

        cy.get('@thirdSuggestion')
          .find('img')
          .should('have.attr', 'alt', 'The Michael Collins')
          .should('have.attr', 'src', '/images/generic-thumb.png');

        cy.get('@thirdSuggestion').click();

        cy.url().should('equal', 'http://localhost:3000/detail/16519193/the-michael-collins');
      });

      describe('when clicking on the last suggestion', () => {
        it('should navigate to the correct detail page', () => {
          cy.get('@thirdSuggestion').click();

          cy.url().should('equal', 'http://localhost:3000/detail/16519193/the-michael-collins');
        });
      });
    });

    describe('and calling the search request successfully, retrieving an empty list of restaurants', () => {
      beforeEach(() => {
        cy.get('@finder').find('input').type('woe');

        cy.wait('@getNoRestaurants');
      });

      it('should display the no suggestions text', () => {
        cy.get('[data-testid=listbox-wrapper]').should(
          'have.text',
          'There are no suggestions for this search',
        );
      });
    });

    describe('and calling the search request unsuccessfully', () => {
      beforeEach(() => {
        cy.get('@finder').find('input').type('row');

        cy.wait('@getRestaurantsError');

        cy.get('[data-testid=listbox-wrapper]').find('p').as('errorTxt');
        cy.get('[data-testid=listbox-wrapper]').find('button').as('tryButton');
      });

      it('should display the error text and the try button', () => {
        cy.get('@errorTxt').should('have.text', 'Sorry but something was wrong...');

        cy.get('@tryButton').should('have.text', 'Try again');
      });

      describe('when clicking on the try button', () => {
        it('should remove the error items and clean the suggestions list and the search input', () => {
          cy.get('@tryButton').click();

          cy.get('@errorTxt').should('have.length', 0);
          cy.get('@tryButton').should('have.length', 0);

          cy.get('@listBox').find('li').should('have.length', 0);
          cy.get('@finder').find('input').should('have.text', '');
        });
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
        cy.get('@areasDropdown').click();

        cy.get('@areasDropdown').find('li').contains('Temple Bar').click();

        cy.get('@searchButton').click();

        cy.url().should('equal', 'http://localhost:3000/search/temple-bar/any-food');
      });
    });

    describe('after selecting a cuisine', () => {
      it('should navigate to search page with the correct cuisine path', () => {
        cy.get('@cuisinesDropdown').click();

        cy.get('@cuisinesDropdown').find('li').contains('Asian').click();

        cy.get('@searchButton').click();

        cy.url().should('equal', 'http://localhost:3000/search/dublin/asian');
      });
    });

    describe('after selecting a location and a cuisine', () => {
      it('should navigate to search page with the correct location and cuisine paths', () => {
        cy.get('@areasDropdown').click();

        cy.get('@areasDropdown').find('li').contains('Temple Bar').click();

        cy.get('@cuisinesDropdown').click();

        cy.get('@cuisinesDropdown').find('li').contains('Asian').click();

        cy.get('@searchButton').click();

        cy.url().should('equal', 'http://localhost:3000/search/temple-bar/asian');
      });
    });
  });
});
