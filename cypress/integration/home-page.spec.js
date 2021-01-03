import { HIGHLIGHTED_RESTAURANTS } from '@/store/statics';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Shows the header with the finder', () => {
    cy.get('header').should('have.length', 1);
    cy.get('[data-testid="finder"]').should('have.length', 1);
  });

  it('Shows the highlights title', () => {
    cy.get('[data-testid="highlights"]')
      .find('h3')
      .should('have.text', 'Featured restaurants');
  });

  it('Shows the highlights cards', () => {
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

  it('Shows the footer with the correct Breadcrumbs', () => {
    cy.get('footer').should('have.length', 1);

    cy.get('[data-testid="breadcrumbs"]')
      .should('have.length', 1)
      .find('div')
      .should('have.length', 1)
      .should('have.text', 'Home');
  });
});
