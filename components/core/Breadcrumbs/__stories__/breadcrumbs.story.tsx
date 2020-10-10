import React from 'react';
import { storiesOf } from '@storybook/react';

import { Breadcrumbs } from '../Breadcrumbs';
import { action } from '@storybook/addon-actions';

import { BREADCRUMBS_DATA_MOCK } from '../__mocks__/breadcrumbs.mocks';

const stories = storiesOf('Breadcrumbs', module);

stories.add('Breadcrumbs', () => (
  <Breadcrumbs
    breadcrumbsData={BREADCRUMBS_DATA_MOCK}
    onClickBreadcrumb={action('breadcrumbs: on click event')}
  />
));
