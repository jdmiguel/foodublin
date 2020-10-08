import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { Title } from '../Title';

import { TITLE_TEXT_MOCK } from '../__mocks__/title.mocks';

const stories = storiesOf('Title', module);

stories.add('Title', () => (
  <Title text={text('title text', TITLE_TEXT_MOCK)} />
));
