import getConfig from 'next/config';

import { Timming } from './types';

export const {
  publicRuntimeConfig: {
    APP_VERSION,
    AUTHENTICATION_API_URL,
    EXAMPLE_API_ENDPOINT,
    BASE_URL,
    BASE_CDN_URL,
    DFP_NETWORK_ID,
    GOOGLE_TAG_MANAGER,
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

// DETAIL PAGE UTILS

export const getTimmings = (timmingsStr: string) =>
  timmingsStr.split(',').reduce((acc: Timming[], next: string) => {
    const firstDayIndex = next.indexOf('(');
    const lastDayIndex = next.indexOf(')');

    if (next.includes('(') && next.includes(')')) {
      acc.push({
        id: next,
        day: next.slice(firstDayIndex + 1, lastDayIndex),
        schedule: next.slice(0, firstDayIndex - 1),
      });
    }

    return acc;
  }, []);

export const getMapSrc = (name: string) => {
  const formattedName = name.split(' ').reduce((acc: string, next: string) => {
    return `${acc}+${next}`;
  }, '');

  console.log('GOOGLE_KEY: ', process.env.googleKey);

  return `https://www.google.com/maps/embed/v1/place?key=${process.env.googleKey}&q=${formattedName},Dublin&zoom=16`;
};
