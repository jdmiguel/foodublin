import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';

import { BUTTON_MOCK } from '../__mocks__/button.mocks';

const stories = storiesOf('Button', module);

stories.add('Button', () => (
  <Button
    loading={boolean('loading', false)}
    onClick={action('button: on click event')}
    fullWidth={false}
  >
    {text('button text', BUTTON_MOCK.text)}
  </Button>
));

stories.add('Floating Button', () => (
  <Button onClick={action('button: on click event')} isFloating={true} fullWidth={false}>
    <i className="material-icons">{BUTTON_MOCK.icon}</i>
  </Button>
));
