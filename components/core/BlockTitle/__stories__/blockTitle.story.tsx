import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { BlockTitle } from '../BlockTitle';
import { BLOCK_TITLE_TEXT_MOCK } from '../__mocks__/blockTitle.mocks';

const stories = storiesOf('BlockTitle', module);

stories.add('BlockTitle', () => (
  <BlockTitle text={text('block title text', BLOCK_TITLE_TEXT_MOCK)} />
));
