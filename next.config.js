require('dotenv').config();

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const withOffline = require('next-offline');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withOffline({
    publicRuntimeConfig: {
      APP_VERSION: process.env.APP_VERSION,
      EXAMPLE_API_ENDPOINT: process.env.EXAMPLE_API_ENDPOINT,
      BASE_URL: process.env.BASE_URL,
      BASE_CDN_URL: process.env.BASE_CDN_URL,
      ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
      LOG_LEVEL: process.env.LOG_LEVEL,
      STORYBOOK_BASE_CDN_URL_STATIC_DIRECTORY:
        process.env.STORYBOOK_BASE_CDN_URL_STATIC_DIRECTORY,
    },

    webpack: (config, options) => {
      const { isServer } = options;

      if (isServer) {
        config.plugins.push(new ForkTsCheckerWebpackPlugin());
      }

      if (process.env.ANALYZE) {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          }),
        );
      }

      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        if (
          entries['main.js'] &&
          !entries['main.js'].includes('./helpers/polyfills.ts')
        ) {
          entries['main.js'].unshift('./helpers/polyfills.ts');
        }

        return entries;
      };

      return config;
    },
  }),
);
