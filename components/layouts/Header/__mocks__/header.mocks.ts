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
    {
      text: 'Fake restaurant',
      route: '/',
      asRoute: '/',
      type: BreadcrumbsType.DETAILS,
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
    {
      text: 'Fake restaurant',
      route: '/',
      asRoute: '/',
      type: BreadcrumbsType.DETAILS,
    },
  ],
};
