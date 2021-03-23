import { HIGHLIGHTED_RESTAURANTS } from '@/store/statics';

describe('HighLights', () => {
  beforeEach(() => {
    cy.visit('/');
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
});
