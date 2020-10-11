import {
  compose,
  getRandomInt,
  getRandomListNumbers,
  getAlphanumericText,
  getLoweredText,
  getFormattedUrlText,
} from '../utils';
import {
  FIRST_DETAIL,
  SECOND_DETAIL,
  THIRD_DETAIL,
  FOURTH_DETAIL,
} from '../../components/pages/DetailPage/__mocks__/detailpage.mocks';
import { LOCATIONS } from '../staticData';

describe('compose', () => {
  it('should be equal to mocked text', () => {
    const expectedText = 'fxbuckley';
    const formattedText = compose(getLoweredText, getAlphanumericText);

    expect(formattedText(THIRD_DETAIL.name)).toEqual(expectedText);
  });
});

describe('getRandomInt', () => {
  it('should be equal to mocked number', () => {
    const expectedNumber = 1;

    expect(getRandomInt(1, 2)).toEqual(expectedNumber);
  });
});

describe('getRandomListNumbers', () => {
  it('should contain a list of numbers', () => {
    expect(getRandomListNumbers(3, 0, 4)).toContain(0);
    expect(getRandomListNumbers(3, 0, 4)).toContain(1);
    expect(getRandomListNumbers(3, 0, 4)).toContain(2);
  });
});

describe('getAlphanumericText', () => {
  it('should be equal to mocked alphanumeric text', () => {
    const expectedText = 'FXBuckley';

    expect(getAlphanumericText(THIRD_DETAIL.name)).toEqual(expectedText);
  });
});

describe('getLoweredText', () => {
  it('should be equal to mocked lowered text', () => {
    const expectedText = 'ballyfermot';

    expect(getLoweredText(SECOND_DETAIL.location)).toBe(expectedText);
  });
});

describe('getFormattedUrlText', () => {
  it('should be equal to mocked formatted url text if text is composed of one word', () => {
    const expectedText = 'boojum';

    expect(getFormattedUrlText(FIRST_DETAIL.name)).toBe(expectedText);
  });

  it('should be equal to mocked formatted url text if text is composed of several words, spaces and symbols', () => {
    const expectedText = 'sophies+the+dean+hotel';

    expect(getFormattedUrlText(FOURTH_DETAIL.name)).toBe(expectedText);
  });

  it('should be equal to mocked formatted url text if text is a path by displaying hyphen between words (instead of plus)', () => {
    const expectedText = 'south-city-west';

    expect(getFormattedUrlText(LOCATIONS[1].name, true)).toBe(expectedText);
  });
});
