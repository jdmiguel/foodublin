/**
 * @jest-environment jsdom
 */

import { getMapSrc } from '../DetailPage';
import { FIRST_DETAIL_MOCKED, FOURTH_DETAIL_MOCKED } from '../__mocks__/detailpage.mocks';

describe('getMapSrc', () => {
  it('should be equal to mocked map src if name is composed of one word and location is composed of two', () => {
    const expectedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=boojum-north+city,Dublin&zoom=16`;

    expect(getMapSrc(FIRST_DETAIL_MOCKED.name, FIRST_DETAIL_MOCKED.location)).toBe(expectedUrl);
  });

  it('should be equal to mocked map src if restaurant name and location are composed of several words, spaces and symbols', () => {
    const expectedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=sophies+the+dean+hotel-the+dean+hotel+city+centre+south,Dublin&zoom=16`;

    expect(getMapSrc(FOURTH_DETAIL_MOCKED.name, FOURTH_DETAIL_MOCKED.location)).toBe(expectedUrl);
  });
});
