import { ReactNode } from 'react';

export type InitialAppState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

// Core / ui components
export enum LoaderType {
  CIRCLE = 'circle',
  LINE = 'line',
}

export type ListItem = {
  iconSrc?: string;
  id: number;
  name: string;
  path: string;
};

// Restaurant data
export type Timming = {
  id: string;
  day: string;
  schedule: string;
};

export enum EntityType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

export type RestaurantsRequestParams = {
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
  thumbSrc: string;
  name: string;
  location: string;
  cuisines: string;
  timings: string;
  rating: number;
  votes: number;
  average: string;
  establishment: string;
  Highlights: string[];
  phone: string;
  address: string;
};

// Breadcrumbs
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

// Actions
type AddFavoriteAction = {
  type: 'ADD_FAVORITE';
  favorite: Restaurant;
};

type DeleteFavoriteAction = {
  type: 'DELETE_FAVORITE';
  id: string;
};

type SetRelatedRestaurantsAction = {
  type: 'SET_RELATED_RESTAURANTS';
  relatedRestaurants: Restaurant[];
};

type ClearRelatedRestaurantsAction = {
  type: 'CLEAR_RELATED_RESTAURANTS';
};

type AddBreadcrumbsAction = {
  type: 'ADD_BREADCRUMBS';
  breadcrumbs: BreadcrumbsData;
};

type ReplaceBreadcrumbsAction = {
  type: 'REPLACE_BREADCRUMBS';
  index: number;
  breadcrumbs: BreadcrumbsData;
};

export type Actions =
  | AddFavoriteAction
  | DeleteFavoriteAction
  | SetRelatedRestaurantsAction
  | ClearRelatedRestaurantsAction
  | AddBreadcrumbsAction
  | ReplaceBreadcrumbsAction;
