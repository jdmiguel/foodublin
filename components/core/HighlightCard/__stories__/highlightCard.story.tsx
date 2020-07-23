import React from 'react';
import { storiesOf } from '@storybook/react';

import { text } from '@storybook/addon-knobs';

import HighlightCard from '../HighlightCard';

import { HIGHLIGHT_CARD_PROPS_MOCKS } from '../__mocks__/highlightCard.mocks';

const stories = storiesOf('HighlightCard', module);

stories.add('HighlightCard', () => (
  <HighlightCard
    {...HIGHLIGHT_CARD_PROPS_MOCKS}
    title={text('title', HIGHLIGHT_CARD_PROPS_MOCKS.title)}
    description={text('description', HIGHLIGHT_CARD_PROPS_MOCKS.description)}
  />
));
