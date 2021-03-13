import { BreadcrumbsType } from '../../../core/types';

export const FOOTER_MOCKS = {
  showVeil: true,
  isExtended: true,
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

export const FOOTER_BAR_MOCKS = {
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
