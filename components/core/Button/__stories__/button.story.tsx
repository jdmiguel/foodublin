import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Button from '../Button';

import { BUTTON_MOCK } from '../__mocks__/button.mocks';

const stories = storiesOf('Button', module);

stories.add('Button', () => (
  <Button
    loading={boolean('loading', false)}
    loaderSrc={BUTTON_MOCK.loaderSrc}
    onClick={action('button: on click event')}
    fullWidth={false}
  >
    {text('button text', BUTTON_MOCK.text)}
  </Button>
));
