describe('DetailPage', () => {
  beforeEach(() => {
    cy.visit('/detail/16518534/bunsen');

    cy.get('[data-testid="detail-header"]').find('button').as('headerButton');
    cy.get('[data-testid="detail-cuisine"]').as('cuisines');
    cy.get('[data-testid="detail-schedule"]').as('schedules');
    cy.get('[data-testid="detail-rating"]').as('rating');
    cy.get('[data-testid="detail-average"]').as('average');
    cy.get('[data-testid="detail-establishment"]').as('establishment');
    cy.get('[data-testid="detail-more-info"]').as('moreInfo');
    cy.get('[data-testid="detail-address"]').as('address');
    cy.get('[data-testid="detail-reviews"]').as('reviews');
  });

  it('should display the image, texts and button of the detail header', () => {
    cy.get('[data-testid="detail-header"]')
      .find('h2')
      .should('have.text', 'Bunsen');

    cy.get('[data-testid="detail-header"]')
      .find('h3')
      .should('have.text', 'South City West');

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
    cy.get('[data-testid="detail-info"]')
      .find('h3')
      .should('have.text', 'Relevant information');
  });

  it('should display the cuisine details', () => {
    cy.get('@cuisines').find('h4').should('have.text', 'Cuisines');
    cy.get('@cuisines').find('p').should('have.text', 'Burger');
  });

  it('should display the schedule details', () => {
    cy.get('@schedules').find('h4').should('have.text', 'Schedule');

    cy.get('@schedules')
      .find('li')
      .eq(0)
      .should('have.text', 'Mon-Wed : 12:30 PM to 9:30 PM');

    cy.get('@schedules')
      .find('li')
      .eq(1)
      .should('have.text', 'Thu-Fri : 12 Noon to 10:30 PM');

    cy.get('@schedules')
      .find('li')
      .eq(2)
      .should('have.text', 'Sat : 12:30 PM to 10:30 PM');

    cy.get('@schedules')
      .find('li')
      .eq(3)
      .should('have.text', 'Sun : 1 PM to 9 PM');
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
    cy.get('@establishment')
      .find('h4')
      .should('have.text', 'Establishment type');
    cy.get('@establishment').find('p').should('have.text', 'Quick Bites');
  });

  it('should display the more info details', () => {
    cy.get('@moreInfo').find('h4').should('have.text', 'More info');

    cy.get('@moreInfo').find('li').eq(0).as('dinner');
    cy.get('@dinner').find('i').should('have.text', 'check_circle');
    cy.get('@dinner').find('p').should('have.text', 'Dinner');

    cy.get('@moreInfo').find('li').eq(1).as('cash');
    cy.get('@cash').find('i').should('have.text', 'check_circle');
    cy.get('@cash').find('p').should('have.text', 'Cash');

    cy.get('@moreInfo').find('li').eq(2).as('debit');
    cy.get('@debit').find('i').should('have.text', 'check_circle');
    cy.get('@debit').find('p').should('have.text', 'Debit Card');

    cy.get('@moreInfo').find('li').eq(3).as('takeaway');
    cy.get('@takeaway').find('i').should('have.text', 'check_circle');
    cy.get('@takeaway').find('p').should('have.text', 'Takeaway Available');

    cy.get('@moreInfo').find('li').eq(4).as('alcohol');
    cy.get('@alcohol').find('i').should('have.text', 'check_circle');
    cy.get('@alcohol').find('p').should('have.text', 'Serves Alcohol');

    cy.get('@moreInfo').find('li').eq(5).as('credit');
    cy.get('@credit').find('i').should('have.text', 'check_circle');
    cy.get('@credit').find('p').should('have.text', 'Credit Card');

    cy.get('@moreInfo').find('li').eq(6).as('lunch');
    cy.get('@lunch').find('i').should('have.text', 'check_circle');
    cy.get('@lunch').find('p').should('have.text', 'Lunch');

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

  it('should display the reviews details', () => {
    cy.get('@reviews').scrollIntoView({ duration: 200, easing: 'linear' });
    cy.get('@reviews').find('h4').should('have.text', 'Reviews');

    // First review
    cy.get('@reviews').find('> div > div').eq(1).as('firstReview');
    cy.get('@firstReview')
      .find('> div')
      .eq(0)
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/images/user_avatars/pizza_2x.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );
    cy.get('@firstReview')
      .find('> div')
      .eq(0)
      .find('p')
      .should('have.text', 'Aadavan');

    cy.get('@firstReview').find('> div').eq(1).as('firstReviewRating');

    cy.get('@firstReviewRating').find('i').eq(0).should('have.text', 'star');
    cy.get('@firstReviewRating').find('i').eq(1).should('have.text', 'star');
    cy.get('@firstReviewRating').find('i').eq(2).should('have.text', 'star');
    cy.get('@firstReviewRating').find('i').eq(3).should('have.text', 'star');
    cy.get('@firstReviewRating')
      .find('i')
      .eq(4)
      .should('have.text', 'star_outline');
    cy.get('@firstReviewRating').find('p').should('have.text', 'Mar 22, 2020');

    cy.get('@firstReview').find('> p').should('have.text', 'Great!');

    // Second review
    cy.get('@reviews').find('> div > div').eq(2).as('secondReview');
    cy.get('@secondReview')
      .find('> div')
      .eq(0)
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/user_profile_pictures/262/1ddce2637153d6303fac71cdd85bc262.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
      );
    cy.get('@secondReview')
      .find('> div')
      .eq(0)
      .find('p')
      .should('have.text', 'Blueberries & Bourbon');

    cy.get('@secondReview').find('> div').eq(1).as('secondReviewRating');

    cy.get('@secondReviewRating').find('i').eq(0).should('have.text', 'star');
    cy.get('@secondReviewRating').find('i').eq(1).should('have.text', 'star');
    cy.get('@secondReviewRating').find('i').eq(2).should('have.text', 'star');
    cy.get('@secondReviewRating').find('i').eq(3).should('have.text', 'star');
    cy.get('@secondReviewRating')
      .find('i')
      .eq(4)
      .should('have.text', 'star_outline');
    cy.get('@secondReviewRating').find('p').should('have.text', 'Mar 21, 2020');

    cy.get('@secondReview').find('> p').should('have.text', 'Great!');

    // Third review
    cy.get('@reviews').find('> div > div').eq(3).as('thirdReview');
    cy.get('@thirdReview')
      .find('> div')
      .eq(0)
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/images/user_avatars/mug_2x.png?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A',
      );
    cy.get('@thirdReview')
      .find('> div')
      .eq(0)
      .find('p')
      .should('have.text', 'Aadit Bail');

    cy.get('@thirdReview').find('> div').eq(1).as('thirdReviewRating');

    cy.get('@thirdReviewRating').find('i').eq(0).should('have.text', 'star');
    cy.get('@thirdReviewRating').find('i').eq(1).should('have.text', 'star');
    cy.get('@thirdReviewRating').find('i').eq(2).should('have.text', 'star');
    cy.get('@thirdReviewRating').find('i').eq(3).should('have.text', 'star');
    cy.get('@thirdReviewRating')
      .find('i')
      .eq(4)
      .should('have.text', 'star_outline');
    cy.get('@thirdReviewRating').find('p').should('have.text', 'Mar 03, 2020');

    cy.get('@thirdReview').find('> p').should('have.text', 'Great!');

    // Fourth review
    cy.get('@reviews').find('> div > div').eq(4).as('fourthReview');
    cy.get('@fourthReview')
      .find('> div')
      .eq(0)
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/user_profile_pictures/ede/577fa24a6b2b399079d07a71e8ca7ede.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
      );
    cy.get('@fourthReview')
      .find('> div')
      .eq(0)
      .find('p')
      .should('have.text', 'Hana');

    cy.get('@fourthReview').find('> div').eq(1).as('fourthReviewRating');

    cy.get('@fourthReviewRating').find('i').eq(0).should('have.text', 'star');
    cy.get('@fourthReviewRating')
      .find('i')
      .eq(1)
      .should('have.text', 'star_outline');
    cy.get('@fourthReviewRating')
      .find('i')
      .eq(2)
      .should('have.text', 'star_outline');
    cy.get('@fourthReviewRating')
      .find('i')
      .eq(3)
      .should('have.text', 'star_outline');
    cy.get('@fourthReviewRating')
      .find('i')
      .eq(4)
      .should('have.text', 'star_outline');
    cy.get('@fourthReviewRating').find('p').should('have.text', 'Jan 21, 2020');

    cy.get('@fourthReview')
      .find('> p')
      .should(
        'have.text',
        'Being at their Baggot Street  place , avoid it . Worst customer device',
      );

    // Fifth review
    cy.get('@reviews').find('> div > div').eq(5).as('fifthReview');
    cy.get('@fifthReview')
      .find('> div')
      .eq(0)
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://b.zmtcdn.com/data/user_profile_pictures/0c7/42aa5399ddb5d5f3a65e4fcf409c50c7.jpg?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A',
      );
    cy.get('@fifthReview')
      .find('> div')
      .eq(0)
      .find('p')
      .should('have.text', 'Arpita Chakraborty');

    cy.get('@fifthReview').find('> div').eq(1).as('fifthReviewRating');

    cy.get('@fifthReviewRating').find('i').eq(0).should('have.text', 'star');
    cy.get('@fifthReviewRating').find('i').eq(1).should('have.text', 'star');
    cy.get('@fifthReviewRating').find('i').eq(2).should('have.text', 'star');
    cy.get('@fifthReviewRating').find('i').eq(3).should('have.text', 'star');
    cy.get('@fifthReviewRating')
      .find('i')
      .eq(4)
      .should('have.text', 'star_outline');
    cy.get('@fifthReviewRating').find('p').should('have.text', 'May 21, 2019');

    cy.get('@fifthReview')
      .find('> p')
      .should(
        'have.text',
        'I know everyone goes to Bunsen for the earthshattering burgers, but I go there more for the sweet potato fries! Must be prepared to wait for about 20 mins in average though. Happened all three times I went.',
      );
  });
});
