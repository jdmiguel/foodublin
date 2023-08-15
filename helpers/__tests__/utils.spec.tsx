import {
  compose,
  getRandomInt,
  getAlphanumericText,
  getLoweredText,
  getFormattedUrlText,
  getTitleText,
} from '../utils';
import {
  FIRST_DETAIL_MOCKED,
  SECOND_DETAIL_MOCKED,
  THIRD_DETAIL_MOCKED,
  FOURTH_DETAIL_MOCKED,
} from '../../components/pages/DetailPage/__mocks__/detailpage.mocks';

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
    const areas = [
      {
        id: 162239,
        name: 'South City West',
        path: 'south-city-west',
      },
    ];

    expect(getFormattedUrlText(areas[0].name, true)).toBe('south-city-west');
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
