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
    cy.get('[data-testid=listbox-wrapper]').last().find('li').eq(0).as('firstSuggestion');

    cy.get('@firstSuggestion').find('h4').should('have.text', 'The Cat and Cage');

    cy.get('@firstSuggestion').click();

    // NAVIGATE TO DETAIL
    cy.url().should('equal', 'http://localhost:3000/detail/16509210/the-cat-and-cage');

    cy.wait(500);

    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');

    // CLICK HEADER BUTTON
    cy.get('@headerButton').click();
    cy.get('@headerButton').should('contain', 'saved');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>The Cat and Cage');

    // CHECK RELATED RESTAURANTS
    cy.get('[data-testid="detail-related"]').as('relatedRestaurants');

    cy.get('@relatedRestaurants').find('h3').should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants').find('[data-testid="card"]').should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="header-bar"]').find('a').contains('FAVORITES').click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main').find('h3').should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'The Cat and Cage')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/pictures/0/16509210/8d166a49f337a3e7443bb066e3d15dfb_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );

    cy.get('@savedRestaurant').find('h4').should('have.text', 'The Cat and Cage');

    cy.get('@savedRestaurant').find('p').should('have.text', 'Drumcondra');

    // CHECK BREADCRUMBS
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>The Cat and Cage>Favorites');

    // CLICK SECOND BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(1).find('a').click();

    // NAVIGATE TO DETAIL
    cy.url().should('equal', 'http://localhost:3000/detail/16509210/the-cat-and-cage');

    // CLICK FIRST BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(0).find('a').click();

    // NAVIGATE TO HOME
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('does not smoke with the complete flow when searching by using the location and cuisine dropdowns', () => {
    // SELECT LOCATION AND CUISINE
    cy.get('[data-testid=dropdown]').first().as('areasDropdown');
    cy.get('[data-testid=dropdown]').last().as('cuisinesDropdown');

    cy.get('@areasDropdown').click();

    cy.get('@areasDropdown').find('li').contains('South City West').click();

    cy.get('@cuisinesDropdown').click();

    cy.get('@cuisinesDropdown').find('li').contains('Mediterranean').click();

    // NAVIGATE TO SEARCH
    cy.get('[data-testid=finder]').find('button').contains('Search').as('searchButton').click();

    cy.url().should('equal', 'http://localhost:3000/search/south-city-west/mediterranean');

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
    cy.url().should('equal', 'http://localhost:3000/detail/9101223/coppinger-row');

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

    cy.get('@relatedRestaurants').find('h3').should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants').find('[data-testid="card"]').should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="header-bar"]').find('a').contains('FAVORITES').click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main').find('h3').should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'Coppinger Row')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/pictures/chains/3/9101223/149d4f0a21cea9d29589ca75f9bdf3e7_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
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
    cy.url().should('equal', 'http://localhost:3000/detail/9101223/coppinger-row');

    // CLICK SECOND BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(1).find('a').click();

    // NAVIGATE TO SEARCH
    cy.url().should('equal', 'http://localhost:3000/search/south-city-west/mediterranean');

    // CLICK FIRST BREADCRUMB
    cy.get('[data-testid="breadcrumbs"]').find('> div').eq(0).find('a').click();

    // NAVIGATE TO HOME
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('does not smoke with the complete flow when clicking a Highlight', () => {
    // CLICK FIRST HIGHLIGHT
    cy.get('[data-testid="card"]').eq(0).click();

    // NAVIGATE TO DETAIL
    cy.url().should('equal', 'http://localhost:3000/detail/9100233/cleaver-east');

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

    cy.get('@relatedRestaurants').find('h3').should('have.text', 'Related restaurants');

    cy.get('@relatedRestaurants').find('[data-testid="card"]').should('have.length', 3);

    // CLICK FAVORITES BUTTON
    cy.get('[data-testid="header-bar"]').find('a').contains('FAVORITES').click();

    // NAVIGATE TO FAVORITES
    cy.url().should('equal', 'http://localhost:3000/favorites');

    cy.wait(500);

    // CHECK FAVORITES TITLE
    cy.get('main').find('h3').should('have.text', '1 restaurant saved in your favorites');

    // CHECK FAVORITES
    cy.get('main').find('[data-testid="card"]').as('savedRestaurant');

    cy.get('@savedRestaurant')
      .find('img')
      .should('have.attr', 'alt', 'Cleaver East - The Clarence Hotel')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/pictures/chains/3/9100233/29b2d4d194b2a4cb5f6bb6ce4a37aac5_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );

    cy.get('@savedRestaurant').find('h4').should('have.text', 'Cleaver East - The Clarence Hotel');

    cy.get('@savedRestaurant').find('p').should('have.text', 'The Clarence Hotel, Temple Bar');

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
