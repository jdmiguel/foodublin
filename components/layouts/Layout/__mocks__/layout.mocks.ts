/* eslint-disable @typescript-eslint/no-empty-function */

import { BreadcrumbsType } from '../../../core/types';

export const LAYOUT_MOCKS = {
  isExtendedHeader: false,
  onNavigate: () => {},
  breadcrumbs: [
    {
      text: 'Home',
      route: '/',
      asRoute: '/',
      type: BreadcrumbsType.HOME,
    },
  ],
};
