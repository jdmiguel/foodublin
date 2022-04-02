/* eslint-disable @typescript-eslint/no-empty-function */

import { BreadcrumbsType } from '../../../core/types';

export const HEADER_MOCKS = {
  bgImgSrc: '/images/food.jpg',
  claimTxt: 'Mocked claim text',
  onClickLogo: () => {},
  onClickBreadcrumb: () => {},
  onClickFavorites: () => {},
  onNavigationFromFinder: () => {},
  breadcrumbs: [
    {
      text: 'Home',
      route: '/',
      asRoute: '/',
      type: BreadcrumbsType.HOME,
    },
  ],
};

export const HEADER_BAR_MOCKS = {
  onClickBreadcrumb: () => {},
  onClickFavorites: () => {},
  breadcrumbs: [
    {
      text: 'Home',
      route: '/',
      asRoute: '/',
      type: BreadcrumbsType.HOME,
    },
  ],
};
