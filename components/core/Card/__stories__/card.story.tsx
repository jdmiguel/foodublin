import React from 'react';
import { storiesOf } from '@storybook/react';

import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Card } from '../Card';

import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';

import { CardType } from '../../types';

const stories = storiesOf('Card', module);

stories.add('Standart Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
    onClick={action('card: on click event')}
  />
));

stories.add('Suggestion Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
    type={CardType.SUGGESTION}
    onClick={action('card: on click event')}
  />
));

stories.add('Highlight Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    imgSrc="cleaver-east.jpg"
    title={text('title', CARD_PROPS_MOCKS.title)}
    content={text('content', CARD_PROPS_MOCKS.content)}
    type={CardType.HIGHLIGHT}
    onClick={action('card: on click event')}
  />
));
