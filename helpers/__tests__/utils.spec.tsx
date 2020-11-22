import {
  compose,
  getRandomInt,
  getAlphanumericText,
  getLoweredText,
  getFormattedUrlText,
  getRandomNumbersList,
  getCurrentRelatedRestaurants,
  getTitleText,
} from '../utils';
import {
  FIRST_DETAIL_MOCKED,
  SECOND_DETAIL_MOCKED,
  THIRD_DETAIL_MOCKED,
  FOURTH_DETAIL_MOCKED,
  RELATED_RESTAURANTS_MOCKED,
} from '@/components/pages/DetailPage/__mocks__/detailpage.mocks';

import { LOCATIONS } from '@/store/statics';

describe('compose', () => {
  it('should be equal to mocked text', () => {
    const expectedText = 'fxbuckley';
    const formattedText = compose(getLoweredText, getAlphanumericText);

    expect(formattedText(THIRD_DETAIL_MOCKED.name)).toEqual(expectedText);
  });
});

describe('getRandomInt', () => {
  it('should be equal to mocked number', () => {
    const expectedNumber = 1;

    expect(getRandomInt(1, 2)).toEqual(expectedNumber);
  });
});

describe('getAlphanumericText', () => {
  it('should be equal to mocked alphanumeric text', () => {
    const expectedText = 'FXBuckley';

    expect(getAlphanumericText(THIRD_DETAIL_MOCKED.name)).toEqual(expectedText);
  });
});

describe('getLoweredText', () => {
  it('should be equal to mocked lowered text', () => {
    const expectedText = 'ballyfermot';

    expect(getLoweredText(SECOND_DETAIL_MOCKED.location)).toBe(expectedText);
  });
});

describe('getFormattedUrlText', () => {
  it('should be equal to mocked formatted url text if text is composed of one word', () => {
    const expectedText = 'boojum';

    expect(getFormattedUrlText(FIRST_DETAIL_MOCKED.name)).toBe(expectedText);
  });

  it('should be equal to mocked formatted url text if text is composed of several words, spaces and symbols', () => {
    const expectedText = 'sophies+the+dean+hotel';

    expect(getFormattedUrlText(FOURTH_DETAIL_MOCKED.name)).toBe(expectedText);
  });

  it('should be equal to mocked formatted url text if text is a path by displaying hyphen between words (instead of plus)', () => {
    const expectedText = 'south-city-west';

    expect(getFormattedUrlText(LOCATIONS[1].name, true)).toBe(expectedText);
  });
});

describe('getRandomNumbersList', () => {
  it('should contain a list of numbers when it receives an array with 3 elements', () => {
    const expectedNumberList = [0, 1, 2];
    const numberList = getRandomNumbersList(3, 0, 3);

    expect(numberList).toHaveLength(3);
    expect(numberList).toStrictEqual(
      expect.arrayContaining(expectedNumberList),
    );
  });

  it('should contain a list of numbers when it receives an array with more than 3 elements', () => {
    const expectedMatchedNumberList = [0, 1, 2, 4, 5];
    const numberList = getRandomNumbersList(3, 0, 6);
    const isMatchedNumberList = numberList.every((number) =>
      expectedMatchedNumberList.includes(number),
    );

    expect(numberList).toHaveLength(3);
    expect(numberList).not.toContain(3);
    expect(isMatchedNumberList).toBeTruthy();
  });
});

describe('getCurrentRelatedRestaurants', () => {
  it('should contain a list of numbers when it receives an array with 4 elements', () => {
    const relatedRestaurantsMocked = RELATED_RESTAURANTS_MOCKED.slice(0, 4);
    const expectedCurrentRelatedRestaurants = RELATED_RESTAURANTS_MOCKED.slice(
      0,
      3,
    );
    const currentRelatedRestaurants = getCurrentRelatedRestaurants(
      relatedRestaurantsMocked,
      relatedRestaurantsMocked[3].id,
    );

    expect(currentRelatedRestaurants).toHaveLength(3);
    expect(currentRelatedRestaurants).toEqual(
      expect.arrayContaining(expectedCurrentRelatedRestaurants),
    );
  });

  it('should contain a list of numbers when it receives an array with 5 elements', () => {
    const currentRelatedRestaurants = getCurrentRelatedRestaurants(
      RELATED_RESTAURANTS_MOCKED,
      RELATED_RESTAURANTS_MOCKED[4].id,
    );

    const arrayComparator = (accumulator, currentValue) => {
      accumulator = RELATED_RESTAURANTS_MOCKED.some(
        (relatedRestaurantMocked) =>
          relatedRestaurantMocked.id === currentValue.id,
      );

      return accumulator;
    };

    const isMatchedCurrentRelatedRestaurants = currentRelatedRestaurants.reduce(
      arrayComparator,
      false,
    );

    expect(currentRelatedRestaurants).toHaveLength(3);
    expect(isMatchedCurrentRelatedRestaurants).toBeTruthy();
  });
});

describe('getTitleText', () => {
  it('should be equal to expected text when total is 0', () => {
    const expectedText = 'There are no restaurants';
    const { totalText, restaurantText } = getTitleText(0);
    const endText = `${totalText} ${restaurantText}`;

    expect(endText).toBe(expectedText);
  });

  it('should be equal to expected text when total is 1', () => {
    const expectedText = '1 restaurant';
    const { totalText, restaurantText } = getTitleText(1);
    const endText = `${totalText} ${restaurantText}`;

    expect(endText).toBe(expectedText);
  });

  it('should be equal to expected text when total is more than 1', () => {
    const expectedText = '25 restaurants';
    const { totalText, restaurantText } = getTitleText(25);
    const endText = `${totalText} ${restaurantText}`;

    expect(endText).toBe(expectedText);
  });
});
