import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Logo from '../Logo';

import { LOGO_TEXT_MOCKS } from '../__mocks__/logo.mocks';

const stories = storiesOf('Logo', module);

const logoOptions = {
  primary: LOGO_TEXT_MOCKS.logoPrimarySrc,
  dark: LOGO_TEXT_MOCKS.logoDarkSrc,
  light: LOGO_TEXT_MOCKS.logoLightSrc,
};

stories.add('Logo', () => (
  <Logo
    logoSrc={select(
      'Logo version',
      logoOptions,
      LOGO_TEXT_MOCKS.logoPrimarySrc,
    )}
  />
));
