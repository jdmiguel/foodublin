import {
  compose,
  getTimmings,
  getAlphanumericText,
  getLoweredText,
  getFormattedUrlText,
  getMapSrc,
} from '../utils';
import {
  FIRST_DETAIL,
  SECOND_DETAIL,
  THIRD_DETAIL,
  FOURTH_DETAIL,
} from '../../components/DetailPage/__mocks__/detailpage.mocks';
import { LOCATIONS } from '../staticData';

describe('compose', () => {
  it('should be equal to mocked text', () => {
    const expectedText = 'fxbuckley';
    const formattedText = compose(getLoweredText, getAlphanumericText);

    expect(formattedText(THIRD_DETAIL.name)).toEqual(expectedText);
  });
});

describe('getTimmings', () => {
  it('should be equal to mocked timmings', () => {
    const expectedTimmings = [
      {
        id: '11:30 AM to 9 PM (Mon-Fri)',
        day: 'Mon-Fri',
        schedule: '11:30 AM to 9 PM',
      },
      {
        id: '12 Noon to 9 PM (Sat)',
        day: 'Sat',
        schedule: '12 Noon to 9 PM',
      },
      {
        id: '1 PM to 6 PM (Sun)',
        day: 'Sun',
        schedule: '1 PM to 6 PM',
      },
    ];

    expect(getTimmings(FIRST_DETAIL.timmings)).toEqual(expectedTimmings);
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

describe('getMapSrc', () => {
  it('should be equal to mocked map src if name is composed of one word and location is composed of two', () => {
    const expectedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=boojum-north+city,Dublin&zoom=16`;

    expect(getMapSrc(FIRST_DETAIL.name, FIRST_DETAIL.location)).toBe(
      expectedUrl,
    );
  });

  it('should be equal to mocked map src if restaurant name and location are composed of several words, spaces and symbols', () => {
    const expectedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=sophies+the+dean+hotel-the+dean+hotel+city+centre+south,Dublin&zoom=16`;

    expect(getMapSrc(FOURTH_DETAIL.name, FOURTH_DETAIL.location)).toBe(
      expectedUrl,
    );
  });
});
