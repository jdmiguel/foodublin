import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Button from '../Button';

import { BUTTON_PROPS_MOCKS } from '../__mocks__/button.mocks';

const stories = storiesOf('Button', module);

stories.add('Button', () => (
  <Button
    {...BUTTON_PROPS_MOCKS}
    loading={boolean('loading', false)}
    onClick={action('button: on click event')}
    buttonTxt={text('button text', 'text')}
  />
));
