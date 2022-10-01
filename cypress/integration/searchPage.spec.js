describe('SearchPage', () => {
  beforeEach(() => {
    cy.visit('/search/dundrum/indian');

    cy.get('footer').find('> div').last().as('footerContent');
  });

  // HEADER
  it('should display the logo and the claim', () => {
    cy.get('header')
      .find('h1 > img')
      .should('have.attr', 'alt', 'FooDublin Logo')
      .should('have.attr', 'src', '/images/logo.svg');

    cy.get('header').find('h2').should('have.text', 'Discover the best food in Dublin');
  });

  it('should display the headerBar', () => {
    cy.get('[data-testid=header-bar]').should('have.length', 1);
  });

  it('should display the correct Breadcrumbs', () => {
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>Indian in Dundrum');
  });

  describe('when clicking on the first breadcrumb', () => {
    it('should navigate to the home page', () => {
      // Click breadcrumb link
      cy.get('[data-testid="breadcrumbs"]').find('a').contains('Home').click();

      cy.url().should('equal', 'http://localhost:3000/');
    });
  });

  describe('when clicking on the favorite link', () => {
    it('should navigate to the favorite page', () => {
      // Click favorite link
      cy.get('[data-testid="header-bar"]').find('a').contains('FAVORITES').click();

      cy.url().should('equal', 'http://localhost:3000/favorites');
    });
  });

  it('should not display the finder', () => {
    cy.get('[data-testid=finder]').should('have.length', 0);
  });

  // RESTAURANTS SEARCH
  describe('when there are matched restaurants', () => {
    beforeEach(() => {
      cy.visit('/search/south-city-west/mediterranean');

      cy.intercept(
        'GET',
        'https://developers.zomato.com/api/v2.1/search?entity_id=162239&entity_type=subzone&cuisines=70&sort=cost&order=asc',
      ).as('getFirstSortedRestaurants');

      cy.intercept(
        'GET',
        'https://developers.zomato.com/api/v2.1/search?entity_id=162239&entity_type=subzone&cuisines=70&sort=cost&order=desc',
      ).as('getSecondSortedRestaurants');

      cy.intercept(
        'GET',
        'https://developers.zomato.com/api/v2.1/search?entity_id=162239&entity_type=subzone&cuisines=70&sort=rating&order=asc',
      ).as('getThirdSortedRestaurants');

      cy.intercept(
        'GET',
        'https://developers.zomato.com/api/v2.1/search?entity_id=162239&entity_type=subzone&cuisines=70&sort=rating&order=desc',
      ).as('getFourthSortedRestaurants');

      cy.get('[data-testid="card"]').eq(0).as('firstRestaurant');
      cy.get('[data-testid="card"]').eq(1).as('secondRestaurant');
      cy.get('[data-testid="card"]').eq(2).as('thirdRestaurant');
      cy.get('[data-testid="card"]').eq(3).as('fourthRestaurant');
      cy.get('[data-testid="card"]').eq(4).as('fifthRestaurant');
      cy.get('[data-testid="card"]').eq(5).as('sixthRestaurant');
    });

    it('should display the text with the number of restaurants in the selected location', () => {
      cy.get('[data-testid="search-page"]')
        .find('h3')
        .should('have.text', '6 Mediterranean restaurants in South City West');
    });

    it('should display the matched restaurants', () => {
      cy.get('[data-testid="card"]').should('have.length', 6);

      // First restaurant
      cy.get('@firstRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Coppinger Row')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/chains/3/9101223/149d4f0a21cea9d29589ca75f9bdf3e7_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@firstRestaurant').find('h4').should('have.text', 'Coppinger Row');
      cy.get('@firstRestaurant').find('p').should('have.text', 'South City West');

      // Second restaurant
      cy.get('@secondRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Platform 61')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/3/9101733/72f02af3bff1fe060ca1b9120596f08e_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@secondRestaurant').find('h4').should('have.text', 'Platform 61');
      cy.get('@secondRestaurant').find('p').should('have.text', 'South City West');

      // Third restaurant
      cy.get('@thirdRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Il Fuoco')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/0/16520820/0e9d542556842493844a01661c4e176d_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@thirdRestaurant').find('h4').should('have.text', 'Il Fuoco');
      cy.get('@thirdRestaurant').find('p').should('have.text', 'South City West');

      // Fourth restaurant
      cy.get('@fourthRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Habibi')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/8/9101838/3e7d6a9bcf56cac0d5c026289d2beaa0_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@fourthRestaurant').find('h4').should('have.text', 'Habibi');
      cy.get('@fourthRestaurant').find('p').should('have.text', 'South City West');

      // Fifth restaurant
      cy.get('@fifthRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Mykonos Taverna')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/8/9101608/3686583f07eb1a950505e45fb804bbf1_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@fifthRestaurant').find('h4').should('have.text', 'Mykonos Taverna');
      cy.get('@fifthRestaurant').find('p').should('have.text', 'Temple Bar');

      // Sixth restaurant
      cy.get('@sixthRestaurant')
        .find('img')
        .should('have.attr', 'alt', 'Corfu')
        .should(
          'have.attr',
          'src',
          'https://b.zmtcdn.com/data/pictures/8/9100538/9a47d1dc561c87ff787d52c85be1721a_featured_v2.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
        );
      cy.get('@sixthRestaurant').find('h4').should('have.text', 'Corfu');
      cy.get('@sixthRestaurant').find('p').should('have.text', 'Temple Bar');
    });

    describe('when clicking on the COST - high to low filter', () => {
      it('should display the restaurants by sorting them properly', () => {
        // Click first filter button
        cy.get('[data-testid="filters"]').find('button').eq(0).click();

        cy.wait('@getFirstSortedRestaurants');

        // First restaurant
        cy.get('[data-testid="card"]').eq(0).find('h4').should('have.text', 'Habibi');

        // Second restaurant
        cy.get('[data-testid="card"]').eq(1).find('h4').should('have.text', 'Coppinger Row');

        // Third restaurant
        cy.get('[data-testid="card"]').eq(2).find('h4').should('have.text', 'Il Fuoco');

        // Fourth restaurant
        cy.get('[data-testid="card"]').eq(3).find('h4').should('have.text', 'Mykonos Taverna');

        // fifth restaurant
        cy.get('[data-testid="card"]').eq(4).find('h4').should('have.text', 'Corfu');

        // Sixth restaurant
        cy.get('[data-testid="card"]').eq(5).find('h4').should('have.text', 'Platform 61');
      });
    });

    describe('when clicking on the COST - low to high filter', () => {
      it('should display the restaurants by sorting them properly', () => {
        // Click second filter button
        cy.get('[data-testid="filters"]').find('button').eq(1).click();

        cy.wait('@getSecondSortedRestaurants');

        // First restaurant
        cy.get('[data-testid="card"]').eq(0).find('h4').should('have.text', 'Platform 61');

        // Second restaurant
        cy.get('[data-testid="card"]').eq(1).find('h4').should('have.text', 'Coppinger Row');

        // Third restaurant
        cy.get('[data-testid="card"]').eq(2).find('h4').should('have.text', 'Il Fuoco');

        // Fourth restaurant
        cy.get('[data-testid="card"]').eq(3).find('h4').should('have.text', 'Mykonos Taverna');

        // fifth restaurant
        cy.get('[data-testid="card"]').eq(4).find('h4').should('have.text', 'Corfu');

        // Sixth restaurant
        cy.get('[data-testid="card"]').eq(5).find('h4').should('have.text', 'Habibi');
      });
    });

    describe('when clicking on the RANK - high to low filter', () => {
      it('should display the restaurants by sorting them properly', () => {
        // Click third filter button
        cy.get('[data-testid="filters"]').find('button').eq(2).click();

        cy.wait('@getThirdSortedRestaurants');

        // First restaurant
        cy.get('[data-testid="card"]').eq(0).find('h4').should('have.text', 'Il Fuoco');

        // Second restaurant
        cy.get('[data-testid="card"]').eq(1).find('h4').should('have.text', 'Mykonos Taverna');

        // Third restaurant
        cy.get('[data-testid="card"]').eq(2).find('h4').should('have.text', 'Platform 61');

        // Fourth restaurant
        cy.get('[data-testid="card"]').eq(3).find('h4').should('have.text', 'Corfu');

        // fifth restaurant
        cy.get('[data-testid="card"]').eq(4).find('h4').should('have.text', 'Coppinger Row');

        // Sixth restaurant
        cy.get('[data-testid="card"]').eq(5).find('h4').should('have.text', 'Habibi');
      });
    });

    describe('when clicking on the RANK - low to high filter', () => {
      it('should display the restaurants by sorting them properly', () => {
        // Click fourth filter button
        cy.get('[data-testid="filters"]').find('button').eq(3).click();

        cy.wait('@getFourthSortedRestaurants');

        // First restaurant
        cy.get('[data-testid="card"]').eq(0).find('h4').should('have.text', 'Coppinger Row');

        // Second restaurant
        cy.get('[data-testid="card"]').eq(1).find('h4').should('have.text', 'Platform 61');

        // Third restaurant
        cy.get('[data-testid="card"]').eq(2).find('h4').should('have.text', 'Corfu');

        // Fourth restaurant
        cy.get('[data-testid="card"]').eq(3).find('h4').should('have.text', 'Mykonos Taverna');

        // fifth restaurant
        cy.get('[data-testid="card"]').eq(4).find('h4').should('have.text', 'Il Fuoco');

        // Sixth restaurant
        cy.get('[data-testid="card"]').eq(5).find('h4').should('have.text', 'Habibi');
      });
    });
  });

  describe('When there are no matched restaurants', () => {
    beforeEach(() => {
      cy.visit('search/clondalkin/healthy-food');
    });

    it('should display the text no restaurants in the selected location', () => {
      cy.get('[data-testid="search-page"]')
        .find('h3')
        .should('have.text', 'There are no Healthy Food restaurants in Clondalkin');
    });

    it('should not display the filters', () => {
      cy.get('[data-testid="filters"]').should('have.length', 0);
    });

    it('should not display any restaurants', () => {
      cy.get('[data-testid="card"]').should('have.length', 0);
    });
  });

  // FOOTER
  it('should render the correct href of the jdmiguel link', () => {
    cy.get('@footerContent')
      .find('a')
      .contains('JDMIGUEL')
      .should('have.attr', 'href', 'https://jdmiguel.netlify.app');
  });

  describe('when clicking on the favorite link of the footer', () => {
    it('should navigate to the favorite page', () => {
      // Click favorite link
      cy.get('footer').find('a').contains('FAVORITES').click();

      cy.url().should('equal', 'http://localhost:3000/favorites');
    });
  });

  it('should render the correct href of the design system link', () => {
    cy.get('@footerContent')
      .find('a')
      .contains('DESIGN SYSTEM')
      .should('have.attr', 'href', 'https://foodublin-design-system.netlify.app');
  });
});
