import { FilterSort, FilterOrder } from '@/store/statics';

export enum LogoSize {
  BIG = 'big',
  SMALL = 'small',
}

export enum LoaderType {
  CIRCLE = 'circle',
  LINE = 'line',
}

export enum LoaderMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export type ListItem = {
  id: number;
  iconSrc?: string;
  isActive?: boolean;
  name: string;
  path: string;
};

export enum CardType {
  SUGGESTION = 'suggestion',
  STANDART = 'standart',
  HIGHLIGHT = 'highlight',
}

export enum CustomLinkSize {
  BIG = 'big',
  SMALL = 'small',
}

export enum BreadcrumbsType {
  HOME = 'home',
  SEARCH = 'search',
  DETAILS = 'details',
  FAVORITES = 'favorite',
}

export type BreadcrumbsData = {
  text: string;
  route: string;
  asRoute: string;
  type:
    | BreadcrumbsType.HOME
    | BreadcrumbsType.SEARCH
    | BreadcrumbsType.DETAILS
    | BreadcrumbsType.FAVORITES;
};

export type FilterData = {
  isActive: boolean;
  primaryText: string;
  secondaryText: string;
  icon: string;
  sort: FilterSort.COST | FilterSort.RANK;
  order: FilterOrder.ASC | FilterOrder.DESC;
  id: number;
};
