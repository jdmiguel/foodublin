import {
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

describe('getTimmings', () => {
  it('should be equal to mocked timmings', () => {
    const mockedTimmings = [
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
    expect(getTimmings(FIRST_DETAIL.timmings)).toEqual(mockedTimmings);
  });
});

describe('getAlphanumericText', () => {
  it('should be equal to mocked alphanumeric text', () => {
    const mockedAlphanumericText = 'FXBuckley';
    expect(getAlphanumericText(THIRD_DETAIL.name)).toEqual(
      mockedAlphanumericText,
    );
  });
});

describe('getLoweredText', () => {
  it('should be equal to mocked lowered text', () => {
    const mockedLoweredText = 'ballyfermot';
    expect(getLoweredText(SECOND_DETAIL.location)).toBe(mockedLoweredText);
  });
});

describe('getFormattedUrlText', () => {
  it('should be equal to mocked formatted url text if text is composed of one word', () => {
    const mockedFormattedUrlText = 'boojum';
    expect(getFormattedUrlText(FIRST_DETAIL.name)).toBe(mockedFormattedUrlText);
  });

  it('should be equal to mocked formatted url text if text is composed of more than one word, spaces and symbols', () => {
    const mockedFormattedUrlText = 'sophies+the+dean+hotel';
    expect(getFormattedUrlText(FOURTH_DETAIL.name)).toBe(
      mockedFormattedUrlText,
    );
  });
});

describe('getMapSrc', () => {
  it('should be equal to mocked mapSrc if name is composed of one word and location is composed of two', () => {
    const mockedMapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=boojum-north+city,Dublin&zoom=16`;
    expect(getMapSrc(FIRST_DETAIL.name, FIRST_DETAIL.location)).toBe(
      mockedMapSrc,
    );
  });

  it('should be equal to mocked mapSrc if restaurant name and location are composed of more than one word, spaces and symbols', () => {
    const mockedMapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=sophies+the+dean+hotel-the+dean+hotel+city+centre+south,Dublin&zoom=16`;
    expect(getMapSrc(FOURTH_DETAIL.name, FOURTH_DETAIL.location)).toBe(
      mockedMapSrc,
    );
  });
});
