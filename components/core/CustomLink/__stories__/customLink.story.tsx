import React from 'react';
import { storiesOf } from '@storybook/react';

import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { CustomLink } from '../CustomLink';

import { CUSTOM_LINK_MOCK } from '../__mocks__/customLink.mocks';

const stories = storiesOf('CustomLink', module);

stories.add('Simple Text', () => (
  <CustomLink
    onClick={action('customLink: on click event')}
    disabled={boolean('disabled', false)}
  >
    {text('custom link text', CUSTOM_LINK_MOCK.text)}
  </CustomLink>
));

stories.add('With Icon', () => (
  <CustomLink
    onClick={action('customLink: on click event')}
    disabled={boolean('disabled', false)}
  >
    <i className="material-icons">{CUSTOM_LINK_MOCK.icon}</i>
    {text('custom link text', CUSTOM_LINK_MOCK.text)}
  </CustomLink>
));
