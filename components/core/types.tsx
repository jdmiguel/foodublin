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
  iconSrc?: string;
  id: number;
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
  DETAIL = 'detail',
  FAVORITES = 'favorite',
}

export type BreadcrumbsData = {
  text: string;
  route: string;
  asRoute: string;
  type:
    | BreadcrumbsType.HOME
    | BreadcrumbsType.SEARCH
    | BreadcrumbsType.DETAIL
    | BreadcrumbsType.FAVORITES;
};
