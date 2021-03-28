require('next/config').setConfig({
  publicRuntimeConfig: {
    BASE_CDN_URL: process.env.STORYBOOK_BASE_CDN_URL_STATIC_DIRECTORY,
    BASE_URL: process.env.BASE_URL,
  },
  serverRuntimeConfig: {},
});
