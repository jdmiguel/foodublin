import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { text, select } from '@storybook/addon-knobs';

import Dropdown from '../Dropdown';

import { DROPDOWN_PROPS_MOCK, ICON_OPTIONS } from '../__mocks__/dropdown.mocks';

const stories = storiesOf('Dropdown', module);

stories.add('Dropdown', () => (
  <Dropdown
    {...DROPDOWN_PROPS_MOCK}
    labelTxt={text('label text', DROPDOWN_PROPS_MOCK.labelTxt)}
    icon={select('Icon', ICON_OPTIONS, DROPDOWN_PROPS_MOCK.icon)}
    onFocus={action('dropdown: on focus event')}
    onBlur={action('dropdown: on blur event')}
    onSelect={action('dropdown: on select option')}
  />
));
