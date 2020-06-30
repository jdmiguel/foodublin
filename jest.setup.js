import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
require('next/config').setConfig({
  publicRuntimeConfig: {
    APP_VERSION: '',
    BASE_CDN_URL: 'http://localhost:3000/static',
    CDN_URL_STATIC_DIRECTORY: 'http://localhost:3000/static',
    DFP_NETWORK_ID: '0000',
    BASE_URL: 'http://localhost:3000',
    EXAMPLE_API_ENDPOINT: 'http://localhost:3000',
  },
  serverRuntimeConfig: {},
});

if (typeof window !== 'undefined') {
  require('intersection-observer');
}
