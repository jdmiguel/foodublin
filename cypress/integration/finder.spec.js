import { LOCATIONS, CUISINES } from '@/store/statics';

describe('Finder', () => {
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
});
