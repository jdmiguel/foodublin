import { ReactNode } from 'react';

export type Timming = {
  id: string;
  day: string;
  schedule: string;
};

export type ListItemType = {
  iconSrc?: string;
  id: number;
  name: string;
  path: string;
};

export enum EntityType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

export type RestaurantsRequestParamsType = {
  entity_id: number | undefined;
  cuisines: number | undefined;
  entity_type: EntityType.CITY | EntityType.SUBZONE;
  start?: number;
  sort?: string;
  order?: string;
  q?: string;
  count?: number;
};

export type Restaurant = {
  id: string;
  imgSrc: string;
  title: string;
  content: ReactNode | string;
  route: string;
  asRoute: string;
};

export type RestaurantDetail = {
  imgSrc: string;
  name: string;
  location: string;
  cuisines: string;
  timings: string;
  rating: number;
  votes: number;
  average: string;
  establishment: string;
  highlights: string[];
  phone: string;
  address: string;
};

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
