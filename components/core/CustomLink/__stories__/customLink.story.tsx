import React from 'react';
import { storiesOf } from '@storybook/react';

import { text } from '@storybook/addon-knobs';

import CustomLink from '../CustomLink';

import { CUSTOM_LINK_MOCK } from '../__mocks__/customLink.mocks';

const stories = storiesOf('CustomLink', module);

stories.add('Simple Text', () => (
  <CustomLink route={CUSTOM_LINK_MOCK.route}>
    {text('custom link text', CUSTOM_LINK_MOCK.text)}
  </CustomLink>
));

stories.add('With Icon', () => (
  <CustomLink route={CUSTOM_LINK_MOCK.route}>
    <i className="material-icons">{CUSTOM_LINK_MOCK.icon}</i>
    {text('custom link text', CUSTOM_LINK_MOCK.text)}
  </CustomLink>
));
