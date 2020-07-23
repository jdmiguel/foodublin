import React from 'react';
import { storiesOf } from '@storybook/react';

import Breadcrumbs from '../Breadcrumbs';

import { BREADCRUMBS_MOCK } from '../__mocks__/breadcrumbs.mocks';

const stories = storiesOf('Breadcrumbs', module);

stories.add('Breadcrumbs', () => (
  <Breadcrumbs breadcrumbsData={BREADCRUMBS_MOCK} />
));
