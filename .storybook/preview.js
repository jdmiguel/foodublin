import { ThemeProvider } from 'styled-components';

//import JSXAddon from "storybook-addon-jsx";
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';

import './reset.css';
import './storybook-env';

/**
 * Add custom decorators
 */
import { theme } from '../helpers/Theme';

const ThemeDecorator = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

// decorators
addDecorator(ThemeDecorator);
addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(
  withInfo({
    styles: {
      header: {
        h1: {
          color: 'gray',
          fontWeight: 400,
        },
      },
    },
  }),
);
