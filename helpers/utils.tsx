import getConfig from 'next/config';

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
