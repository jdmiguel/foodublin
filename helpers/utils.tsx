import getConfig from 'next/config';

import { Restaurant } from './types';

export const {
  publicRuntimeConfig: {
    APP_VERSION,
    AUTHENTICATION_API_URL,
    EXAMPLE_API_ENDPOINT,
    BASE_URL,
    BASE_CDN_URL,
    ENVIRONMENT_NAME,
  },
} = getConfig();

/**
 * Here we build up the CDN URL for busting the cache. We only need this
 * in environments where the CDN is applied. We also disable it on previews for now.
 */
export const CDN_URL_STATIC_DIRECTORY = `${BASE_CDN_URL}${
  APP_VERSION && ENVIRONMENT_NAME !== 'preview' ? `/${APP_VERSION}` : ''
}`;

// GENERAL UTILS

type ComposableStringFunction = (text: string) => string;

export const compose = (...fns: ComposableStringFunction[]) => (
  value: string,
) => fns.reduce((acc, fn) => fn(acc), value);

export const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

//const checkAlphanumeric = (name: string) => !!name.match(/^[0-9a-zA-Z]+$/);

export const getAlphanumericText = (text: string) =>
  text.replace(/[^a-z0-9]/gi, '');

export const getLoweredText = (text: string) => text.toLowerCase();

export const getFormattedUrlText = (text: string, isPath = false) => {
  const concatenatorSymbol = isPath ? '-' : '+';
  return text.split(' ').reduce((acc: string, next: string) => {
    const concatenator =
      acc && getAlphanumericText(next) ? concatenatorSymbol : '';
    const formattedText = compose(getLoweredText, getAlphanumericText);

    return `${acc}${concatenator}${formattedText(next)}`;
  }, '');
};

// RELATED RESTAURANTS

export const getRandomNumbersList = (
  excludedValue: number,
  minRandomValue: number,
  maxRandomValue: number,
) => {
  const indexArray: number[] = [];

  while (indexArray.length < 3) {
    const random = getRandomInt(minRandomValue, maxRandomValue);
    if (random !== excludedValue && !indexArray.includes(random)) {
      indexArray.push(random);
    }
  }

  return indexArray;
};

export const getCurrentRelatedRestaurants = (
  restaurants: Restaurant[],
  currentRestaurantId: string,
) => {
  const currentSuggestionIndex = restaurants.findIndex(
    (restaurants) => restaurants.id === currentRestaurantId,
  );
  const getRelatedRestaurantsIndexList = getRandomNumbersList(
    currentSuggestionIndex,
    0,
    restaurants.length,
  );

  return getRelatedRestaurantsIndexList.map(
    (relatedRestaurantsIndex) => restaurants[relatedRestaurantsIndex],
  );
};

// SEARCH AND FAVORITES PAGE TITLE

export const getTitleText = (total: number) => ({
  totalText: total > 0 ? total : 'There are no',
  restaurantText: `restaurant${total === 0 || total >= 2 ? 's' : ''}`,
});
