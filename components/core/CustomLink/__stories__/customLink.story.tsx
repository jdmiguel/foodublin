import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import CustomLink from '../CustomLink';

import { CUSTOM_LINK } from '../__mocks__/customLink.mocks';

const stories = storiesOf('CustomLink', module);

stories.add('Simple Text', () => (
  <CustomLink route={CUSTOM_LINK.link}>
    {text('custom link text', CUSTOM_LINK.text)}
  </CustomLink>
));

stories.add('With Icon', () => (
  <CustomLink route={CUSTOM_LINK.link}>
    <i className="material-icons">{CUSTOM_LINK.icon}</i>
    {text('custom link text', CUSTOM_LINK.text)}
  </CustomLink>
));
