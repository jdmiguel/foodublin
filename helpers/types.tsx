import { ReactNode } from 'react';

export type InitialAppState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

// Core / ui components

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
  entity_id: number | null;
  cuisines: number | null;
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
  highlights: string[];
  phone: string;
  address: string;
};

export type Review = {
  id: number;
  userName: string;
  userImgSrc: string;
  rating: number;
  date: string;
  text: string;
};

export type RawReview = {
  review: {
    rating: number;
    review_text: string;
    id: number;
    rating_color: string;
    review_time_friendly: string;
    rating_text: string;
    timestamp: number;
    likes: number;
    user: {
      name: string;
      foodie_level: string;
      foodie_level_num: number;
      foodie_color: string;
      profile_url: string;
      profile_image: string;
      profile_deeplink: string;
    };
    comments_count: number;
  };
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
