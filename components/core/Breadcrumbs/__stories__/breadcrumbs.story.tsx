import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Breadcrumbs from '../Breadcrumbs';

import { BREADCRUMBS_MOCK } from '../__mocks__/breadcrumbs.mocks';

const stories = storiesOf('Breadcrumbs', module);

stories.add('Breadcrumbs', () => (
  <Breadcrumbs
    breadcrumbsData={BREADCRUMBS_MOCK}
    onClick={action('breadcrumbs: on click event')}
  />
));
