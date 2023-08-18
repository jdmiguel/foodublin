describe('DetailsPage', () => {
  beforeEach(() => {
    cy.visit('/details/16518534/bunsen');

    cy.get('[data-testid="details-header"]').find('button').as('headerButton');
    cy.get('[data-testid="details-cuisine"]').as('cuisines');
    cy.get('[data-testid="details-schedule"]').as('schedules');
    cy.get('[data-testid="details-rating"]').as('rating');
    cy.get('[data-testid="details-average"]').as('average');
    cy.get('[data-testid="details-establishment"]').as('establishment');
    cy.get('[data-testid="details-more-info"]').as('moreInfo');
    cy.get('[data-testid="details-address"]').as('address');
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
    cy.get('[data-testid="breadcrumbs"]').should('have.text', 'Home>Bunsen');
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

  // REASTAURANT DETAIL
  it('should display the image, texts and button of the detail header', () => {
    cy.get('[data-testid="detail-header"]').find('h2').should('have.text', 'Bunsen');

    cy.get('[data-testid="detail-header"]').find('h3').should('have.text', 'South City West');

    cy.get('@headerButton').should('contain', 'unsaved');
    cy.get('@headerButton').find('i').should('have.text', 'favorite_border');
  });

  describe('when clicking on the button of the detail header', () => {
    it('should change the button mode to saved', () => {
      // Click header button
      cy.get('@headerButton').click();

      cy.get('@headerButton').should('contain', 'saved');
      cy.get('@headerButton').find('i').should('have.text', 'favorite');
    });
  });

  it('should display the information title', () => {
    cy.get('[data-testid="detail-info"]').find('h3').should('have.text', 'Relevant information');
  });

  it('should display the cuisine details', () => {
    cy.get('@cuisines').find('h4').should('have.text', 'Cuisines');
    cy.get('@cuisines').find('p').should('have.text', 'Burger');
  });

  it('should display the schedule details', () => {
    cy.get('@schedules').find('h4').should('have.text', 'Schedule');

    cy.get('@schedules').find('li').eq(0).should('have.text', 'Mon-Wed : 12:30 PM to 9:30 PM');
    cy.get('@schedules').find('li').eq(1).should('have.text', 'Thu-Fri : 12 Noon to 10:30 PM');
    cy.get('@schedules').find('li').eq(2).should('have.text', 'Sat : 12:30 PM to 10:30 PM');
    cy.get('@schedules').find('li').eq(3).should('have.text', 'Sun : 1 PM to 9 PM');
  });

  it('should display the raiting details', () => {
    cy.get('@rating').find('h4').should('have.text', 'Rating');
    cy.get('@rating').find('i').eq(0).should('have.text', 'star');
    cy.get('@rating').find('i').eq(1).should('have.text', 'star');
    cy.get('@rating').find('i').eq(2).should('have.text', 'star');
    cy.get('@rating').find('i').eq(3).should('have.text', 'star');
    cy.get('@rating').find('i').eq(4).should('have.text', 'star_outline');
    cy.get('@rating').find('p').should('have.text', '(204 votes)');
  });

  it('should display the average details', () => {
    cy.get('@average').find('h4').should('have.text', 'Average Cost');
    cy.get('@average').find('p').should('have.text', '€30 for two people');
  });

  it('should display the establishment details', () => {
    cy.get('@establishment').find('h4').should('have.text', 'Establishment type');
    cy.get('@establishment').find('p').should('have.text', 'Quick Bites');
  });

  it('should display the more info details', () => {
    cy.get('@moreInfo').find('h4').should('have.text', 'More info');

    cy.get('@moreInfo').find('li').eq(0).as('cash');
    cy.get('@cash').find('i').should('have.text', 'check_circle');
    cy.get('@cash').find('p').should('have.text', 'Cash');

    cy.get('@moreInfo').find('li').eq(1).as('debit');
    cy.get('@debit').find('i').should('have.text', 'check_circle');
    cy.get('@debit').find('p').should('have.text', 'Debit Card');

    cy.get('@moreInfo').find('li').eq(2).as('takeaway');
    cy.get('@takeaway').find('i').should('have.text', 'check_circle');
    cy.get('@takeaway').find('p').should('have.text', 'Takeaway Available');

    cy.get('@moreInfo').find('li').eq(3).as('dinner');
    cy.get('@dinner').find('i').should('have.text', 'check_circle');
    cy.get('@dinner').find('p').should('have.text', 'Dinner');

    cy.get('@moreInfo').find('li').eq(4).as('credit');
    cy.get('@credit').find('i').should('have.text', 'check_circle');
    cy.get('@credit').find('p').should('have.text', 'Credit Card');

    cy.get('@moreInfo').find('li').eq(5).as('lunch');
    cy.get('@lunch').find('i').should('have.text', 'check_circle');
    cy.get('@lunch').find('p').should('have.text', 'Lunch');

    cy.get('@moreInfo').find('li').eq(6).as('alcohol');
    cy.get('@alcohol').find('i').should('have.text', 'check_circle');
    cy.get('@alcohol').find('p').should('have.text', 'Serves Alcohol');

    cy.get('@moreInfo').find('li').eq(7).as('wifi');
    cy.get('@wifi').find('i').should('have.text', 'check_circle');
    cy.get('@wifi').find('p').should('have.text', 'Wifi');

    cy.get('@moreInfo').find('li').eq(8).as('cheap');
    cy.get('@cheap').find('i').should('have.text', 'check_circle');
    cy.get('@cheap').find('p').should('have.text', 'Cheap Eats');

    cy.get('@moreInfo').find('li').eq(9).as('beer');
    cy.get('@beer').find('i').should('have.text', 'check_circle');
    cy.get('@beer').find('p').should('have.text', 'Beer');

    cy.get('@moreInfo').find('li').eq(10).as('indoor');
    cy.get('@indoor').find('i').should('have.text', 'check_circle');
    cy.get('@indoor').find('p').should('have.text', 'Indoor Seating');

    cy.get('@moreInfo').find('li').eq(11).as('gluten');
    cy.get('@gluten').find('i').should('have.text', 'check_circle');
    cy.get('@gluten').find('p').should('have.text', 'Gluten Free Options');

    cy.get('@moreInfo').find('li').eq(12).as('wine');
    cy.get('@wine').find('i').should('have.text', 'check_circle');
    cy.get('@wine').find('p').should('have.text', 'Wine');
  });

  it('should display the address details', () => {
    cy.get('@address').find('> div').first().as('phone');
    cy.get('@phone').find('h4').should('have.text', 'Phone');
    cy.get('@phone').find('h5').should('have.text', '01 5599532');

    cy.get('@address').find('> div').last().as('location');
    cy.get('@location').find('h4').should('have.text', 'Address');
    cy.get('@location')
      .find('iframe')
      .should(
        'have.attr',
        'src',
        'https://www.google.com/maps/embed/v1/place?key=AIzaSyA_Et_MtcwUzfga48Fak4cPnfvnH4isITU&q=bunsen-south+city+west,Dublin&zoom=16',
      );
    cy.get('@location').find('i').should('have.text', 'place');
    cy.get('@location')
      .find('p')
      .should('have.text', '36 Wexford Street, South City West, Dublin 2');
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
