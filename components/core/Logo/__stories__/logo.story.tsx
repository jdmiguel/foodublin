import React from 'react';
import { storiesOf } from '@storybook/react';

import { select } from '@storybook/addon-knobs';

import Logo, { LogoSize } from '../Logo';

const stories = storiesOf('Logo', module);

stories.add('Logo', () => (
  <Logo logoSrc="logo.svg" size={select('size', LogoSize, LogoSize.BIG)} />
));
