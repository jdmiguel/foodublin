import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Dropdown } from '../Dropdown';

import { DROPDOWN_PROPS_MOCK, ICON_OPTIONS } from '../__mocks__/dropdown.mocks';

const stories = storiesOf('Dropdown', module);

stories.add('Dropdown', () => (
  <Dropdown
    {...DROPDOWN_PROPS_MOCK}
    labelTxt={text('label text', DROPDOWN_PROPS_MOCK.labelTxt)}
    icon={select('icon', ICON_OPTIONS, DROPDOWN_PROPS_MOCK.icon)}
    disabled={boolean('disabled', false)}
    onFocus={action('dropdown: on focus event')}
    onBlur={action('dropdown: on blur event')}
    onSelect={action('dropdown: on select option')}
  />
));
