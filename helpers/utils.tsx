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

// GENERAL UTILS

type ComposableStringFunction = (text: string) => string;

export const compose = (...fns: ComposableStringFunction[]) => (
  value: string,
) => fns.reduce((acc, fn) => fn(acc), value);

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

export const getMapSrc = (name: string, location: string) => {
  const urlName = getFormattedUrlText(name);
  const urlLocation = getFormattedUrlText(location);

  return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_EMBED_KEY}&q=${urlName}-${urlLocation},Dublin&zoom=16`;
};
