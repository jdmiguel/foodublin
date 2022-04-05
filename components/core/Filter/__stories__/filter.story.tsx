import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Filter } from '../Filter';
import { FILTER_MOCK } from '../__mocks__/filter.mock';

const stories = storiesOf('Filter', module);

stories.add('Filter', () => (
  <Filter data={FILTER_MOCK} onClick={action('filter: on click event')} />
));
