import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import { Autocomplete } from '../Autocomplete';

import {
  AUTOCOMPLETE_PROPS_MOCK,
  SUGGESTIONS_MOCK,
} from '../__mocks__/autocomplete.mocks';

const stories = storiesOf('Autocomplete', module);

stories.add('Autocomplete', () => (
  <Autocomplete
    {...AUTOCOMPLETE_PROPS_MOCK}
    loading={boolean('loading', false)}
    suggestions={SUGGESTIONS_MOCK}
    fetchSuggestions={action('autocomplete: fetch suggestions')}
  />
));
