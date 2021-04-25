import { HIGHLIGHTED_RESTAURANTS } from '@/store/statics';

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-testid=header]').as('header');
    cy.get('[data-testid=footer]').find('> div').last().as('footerContent');
  });

  // HEADER
  it('should display the logo and the claim', () => {
    cy.get('@header')
      .find('h1 > img')
      .should('have.attr', 'alt', 'FooDublin Logo')
      .should('have.attr', 'src', '/images/logo.svg');

    cy.get('@header')
      .find('h2')
      .should('have.text', 'Discover the best food in Dublin');
  });

  it('should not display the headerBar', () => {
    cy.get('[data-testid=header-bar]').should('have.length', 0);
  });

  it('should display the finder', () => {
    cy.get('[data-testid=finder]').should('have.length', 1);
  });

  // HIGHLIGHTS
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

  // FOOTER
  it('should display the footer and the footer bar', () => {
    cy.get('[data-testid="footer"]').should('have.length', 1);
    cy.get('[data-testid="footer-bar"]').should('have.length', 1);
  });

  it('should display the correct Breadcrumbs', () => {
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home');
  });

  describe('when clicking on the favorite link of the footer', () => {
    it('should navigate to the favorite page', () => {
      // Click favorite link
      cy.get('[data-testid="footer-bar"]')
        .find('a')
        .contains('FAVORITES')
        .click();

      cy.url().should('equal', 'http://localhost:3000/favorites');
    });
  });

  it('should display the footer content text', () => {
    cy.get('@footerContent').should(
      'have.text',
      'GITHUBFOODUBLIN ©2020BYJDMIGUEL',
    );
  });

  it('should render the correct href of the github link', () => {
    cy.get('@footerContent')
      .find('a')
      .contains('GITHUB')
      .should('have.attr', 'href', 'https://github.com/jdmiguel/foodublin');
  });

  it('should render the correct href of the jdmiguel link', () => {
    cy.get('@footerContent')
      .find('a')
      .contains('JDMIGUEL')
      .should('have.attr', 'href', 'https://jdmiguel.netlify.app/');
  });
});
