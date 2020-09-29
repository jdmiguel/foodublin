import React from 'react';
import { storiesOf } from '@storybook/react';

import { text } from '@storybook/addon-knobs';

import { Card }, { CardType } from '../Card';

import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';

const stories = storiesOf('Card', module);

stories.add('Standart Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
  />
));

stories.add('Suggestion Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
    type={CardType.SUGGESTION}
  />
));

stories.add('Highlight Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    imgSrc="cleaver-east.jpg"
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
    type={CardType.HIGHLIGHT}
  />
));
