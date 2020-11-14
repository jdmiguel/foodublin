import { Restaurant, BreadcrumbsData } from '@helpers/types';

export type InitialAppState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

// Actions

type AddFavoriteAction = {
  type: 'ADD_FAVORITE';
  favorite: Restaurant;
};

type DeleteFavoriteAction = {
  type: 'DELETE_FAVORITE';
  id: number;
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
