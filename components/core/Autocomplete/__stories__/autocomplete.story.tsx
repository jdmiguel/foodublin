import React from 'react';
import { storiesOf } from '@storybook/react';

import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Autocomplete } from '../Autocomplete';
import { AutocompleteMobile } from '../AutocompleteMobile';

import {
  AUTOCOMPLETE_PROPS_MOCK,
  SUGGESTIONS_MOCK,
} from '../__mocks__/autocomplete.mocks';

const stories = storiesOf('Autocomplete', module);

stories.add('Autocomplete', () => (
  <Autocomplete
    {...AUTOCOMPLETE_PROPS_MOCK}
    loading={boolean('loading', false)}
    disabled={boolean('disabled', false)}
    suggestions={SUGGESTIONS_MOCK}
    fetchSuggestions={action('autocomplete: fetch suggestions')}
  />
));

stories.add('AutocompleteMobile', () => (
  <AutocompleteMobile
    {...AUTOCOMPLETE_PROPS_MOCK}
    loading={boolean('loading', false)}
    disabled={boolean('disabled', false)}
    suggestions={SUGGESTIONS_MOCK}
    fetchSuggestions={action('autocomplete: fetch suggestions')}
  />
));
