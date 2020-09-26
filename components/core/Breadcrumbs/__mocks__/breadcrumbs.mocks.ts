import { BreadcrumbsType } from './../../../../helpers/types';

export const BREADCRUMBS_MOCK = [
  { text: 'First step', route: '/', asRoute: '/', type: BreadcrumbsType.HOME },
  {
    text: 'Second step',
    route: '/',
    asRoute: '/',
    type: BreadcrumbsType.SEARCH,
  },
  {
    text: 'Third step',
    route: '/',
    asRoute: '/',
    type: BreadcrumbsType.DETAIL,
  },
];
