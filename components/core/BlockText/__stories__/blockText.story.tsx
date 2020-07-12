import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import BlockText from '../BlockText';

import { BLOCK_TEXT_MOCK } from '../__mocks__/blockText.mocks';

const stories = storiesOf('BlockText', module);

stories.add('BlockText', () => (
  <BlockText text={text('block text', BLOCK_TEXT_MOCK)} />
));
