import React from 'react';
import { storiesOf } from '@storybook/react';

import Logo from '../Logo';

const stories = storiesOf('Logo', module);

stories.add('Logo', () => <Logo logoSrc="logo.svg" />);
