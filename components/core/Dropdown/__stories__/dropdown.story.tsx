import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Dropdown from '../Dropdown';

import { DROPDOWN_PROPS_MOCK } from '../__mocks__/dropdown.mocks';

const stories = storiesOf('Dropdown', module);

stories.add('Dropdown', () => (
  <Dropdown
    {...DROPDOWN_PROPS_MOCK}
    clearable={boolean('clearable', true)}
    onFocus={action('dropdown: on focus event')}
    onBlur={action('dropdown: on blur event')}
    onSelect={action('dropdown: on select option')}
  />
));
