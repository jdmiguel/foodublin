import React from 'react';
import { storiesOf } from '@storybook/react';

import { text } from '@storybook/addon-knobs';

import Card from '../Card';

import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';

const stories = storiesOf('Card', module);

stories.add('Card', () => (
  <Card
    {...CARD_PROPS_MOCKS}
    title={text('title', CARD_PROPS_MOCKS.title)}
    firstText={text('firstText', CARD_PROPS_MOCKS.firstText)}
  />
));
