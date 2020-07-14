import React from 'react';
import { storiesOf } from '@storybook/react';

import { select } from '@storybook/addon-knobs';

import Rating from '../Rating';

import { RATING_VALUE_MOCK } from '../__mocks__/rating.mocks';

const stories = storiesOf('Rating', module);

stories.add('Rating', () => (
  <Rating
    value={select('Stars', RATING_VALUE_MOCK, RATING_VALUE_MOCK.oneStar)}
  />
));
