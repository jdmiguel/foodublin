describe('Smoke tests', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept(
      'GET',
      'https://developers.zomato.com/api/v2.1/search?entity_id=91&entity_type=city&q=cat',
    ).as('getRestaurants');

    cy.get('[data-testid=finder]').as('finder');
  });

  it('does not smoke with the complete flow when selecting a suggestion by using the autocomplete', () => {
    // TYPE SUGGESTION
    cy.get('@finder').find('input').type('cat');

    cy.wait('@getRestaurants');

    // CLICK FIRST SUGGESTION
    cy.get('[data-testid=listbox-wrapper]')
      .last()
      .find('[role="option"]')
      .eq(0)
      .as('firstSuggestion');

    cy.get('@firstSuggestion').find('h4').should('have.text', 'Catch 22');

    cy.get('@firstSuggestion').click();

    // NAVIGATE TO DETAIL
    cy.url().should('equal', 'http://localhost:3000/detail/9101675/catch-22');

    cy.wait(500);

    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');

    // CLICK HEADER BUTTON
    cy.get('@headerButton').click();
    cy.get('@headerButton').should('contain', 'saved');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>Catch 22');

    // CHECK RELATED RESTAURANTS
    cy.get('[data-testid="detail-related"]').as('relatedRestaurants');

    cy.get('@relatedRestaurants')
      .find('h3')
      .should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants')
      .find('[data-testid="card"]')
      .should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="footer-bar"]')
      .find('a')
      .contains('FAVORITES')
      .click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main')
      .find('h3')
      .should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'Catch 22')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/res_imagery/9101675_RESTAURANT_80d2021edc7a45f952bd9c8fbaf8c273.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );

    cy.get('@savedRestaurant').find('h4').should('have.text', 'Catch 22');

    cy.get('@savedRestaurant').find('p').should('have.text', 'South City West');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Catch 22>Favorites',
    );

    // CLICK SECOND BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(1).find('a').click();

    // NAVIGATE TO DETAIL
    cy.url().should('equal', 'http://localhost:3000/detail/9101675/catch-22');

    // CLICK FIRST BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(0).find('a').click();

    // NAVIGATE TO HOME
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('does not smoke with the complete flow when searching by using the location and cuisine dropdowns', () => {
    // SELECT LOCATION AND CUISINE
    cy.get('[data-testid=dropdown]').first().as('locationsDropdown');
    cy.get('[data-testid=dropdown]').last().as('cuisinesDropdown');

    cy.get('@locationsDropdown').click();

    cy.get('@locationsDropdown')
      .find('[role="option"]')
      .contains('South City West')
      .click();

    cy.get('@cuisinesDropdown').click();

    cy.get('@cuisinesDropdown')
      .find('[role="option"]')
      .contains('Mediterranean')
      .click();

    // NAVIGATE TO SEARCH
    cy.get('[data-testid=finder]')
      .find('button')
      .contains('Search')
      .as('searchButton')
      .click();

    cy.url().should(
      'equal',
      'http://localhost:3000/search/south-city-west/mediterranean',
    );

    cy.wait(500);

    // CHECK TITLE
    cy.get('[data-testid="search-page"]')
      .find('h3')
      .should('have.text', '6 Mediterranean restaurants in South City West');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Mediterranean in South City West',
    );

    // CLICK FIRST RESTAURANT
    cy.get('main').find('[data-testid="card"]').eq(0).as('savedRestaurant');
    cy.get('@savedRestaurant').click();

    // NAVIGATE TO DETAIL
    cy.url().should(
      'equal',
      'http://localhost:3000/detail/9101223/coppinger-row',
    );

    cy.wait(500);
    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');

    // CLICK HEADER BUTTON
    cy.get('@headerButton').click();
    cy.get('@headerButton').should('contain', 'saved');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Mediterranean in South City West>Coppinger Row',
    );

    // CHECK RELATED RESTAURANTS
    cy.get('[data-testid="detail-related"]').as('relatedRestaurants');

    cy.get('@relatedRestaurants')
      .find('h3')
      .should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants')
      .find('[data-testid="card"]')
      .should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="footer-bar"]')
      .find('a')
      .contains('FAVORITES')
      .click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main')
      .find('h3')
      .should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'Coppinger Row')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/res_imagery/9101223_RESTAURANT_db4d148c8e5539e1a3883882b24a8406_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );

    cy.get('@savedRestaurant').find('h4').should('have.text', 'Coppinger Row');

    cy.get('@savedRestaurant').find('p').should('have.text', 'South City West');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Mediterranean in South City West>Coppinger Row>Favorites',
    );

    // CLICK THIRD BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(2).find('a').click();

    // NAVIGATE TO DETAIL
    cy.url().should(
      'equal',
      'http://localhost:3000/detail/9101223/coppinger-row',
    );

    // CLICK SECOND BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(1).find('a').click();

    // NAVIGATE TO SEARCH
    cy.url().should(
      'equal',
      'http://localhost:3000/search/south-city-west/mediterranean',
    );

    // CLICK FIRST BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(0).find('a').click();

    // NAVIGATE TO HOME
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it.only('does not smoke with the complete flow when clicking a Highlight', () => {
    // CLICK FIRST HIGHLIGHT
    cy.get('[data-testid="card"]').eq(0).click();

    // NAVIGATE TO DETAIL
    cy.url().should(
      'equal',
      'http://localhost:3000/detail/9100233/cleaver-east',
    );

    cy.wait(500);

    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');

    // CLICK HEADER BUTTON
    cy.get('@headerButton').click();
    cy.get('@headerButton').should('contain', 'saved');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Cleaver East - The Clarence Hotel',
    );

    // CHECK RELATED RESTAURANTS
    cy.get('[data-testid="detail-related"]').as('relatedRestaurants');

    cy.get('@relatedRestaurants')
      .find('h3')
      .should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants')
      .find('[data-testid="card"]')
      .should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="footer-bar"]')
      .find('a')
      .contains('FAVORITES')
      .click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main')
      .find('h3')
      .should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'Cleaver East - The Clarence Hotel')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/res_imagery/9100233_RESTAURANT_8b0a195f5047ea1246c77911e6f18dd4.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );

    cy.get('@savedRestaurant')
      .find('h4')
      .should('have.text', 'Cleaver East - The Clarence Hotel');

    cy.get('@savedRestaurant')
      .find('p')
      .should('have.text', 'The Clarence Hotel, Temple Bar');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should(
      'have.text',
      'Home>Cleaver East - The Clarence Hotel>Favorites',
    );

    // CLICK SECOND BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(1).find('a').click();

    // NAVIGATE TO DETAIL
    cy.url().should(
      'equal',
      'http://localhost:3000/detail/9100233/cleaver-east-the-clarence-hotel',
    );

    // CLICK FIRST BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(0).find('a').click();

    // NAVIGATE TO HOME
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
