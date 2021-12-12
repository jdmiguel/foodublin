import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { Input } from '../Input';
import { INPUT_PROPS_MOCK } from '../__mocks__/input.mocks';

const stories = storiesOf('Input', module);

stories.add('Input', () => (
  <Input
    type="text"
    placeholder={text('placeholder text', INPUT_PROPS_MOCK.placeholder)}
    hasSearchIcon={boolean('icon', true)}
    onChange={action('input: on change event')}
    onFocus={action('input: on focus event')}
    onBlur={action('input: on blur event')}
  />
));
