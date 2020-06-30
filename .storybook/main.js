const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  stories: ['./welcome.story.js', '../**/*.story.tsx'],
  addons: [
    '@storybook/addon-actions/register',
    'storybook-addon-jsx/register',
    '@storybook/addon-knobs/register',
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
    return config;
  },
};
