import { Restaurant, BreadcrumbsData } from '../helpers/types';

export const SET_FAVORITE = 'SET_FAVORITE';
export const SET_RELATED_RESTAURANTS = 'SET_RELATED_RESTAURANTS';
export const CLEAR_RELATED_RESTAURANTS = 'CLEAR_RELATED_RESTAURANTS';
export const ADD_BREADCRUMBS = 'ADD_BREADCRUMBS';
export const REPLACE_BREADCRUMBS = 'REPLACE_BREADCRUMBS';

type SetFavoriteAction = {
  type: 'SET_FAVORITE';
  favorite: Restaurant;
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
  | SetFavoriteAction
  | SetRelatedRestaurantsAction
  | ClearRelatedRestaurantsAction
  | AddBreadcrumbsAction
  | ReplaceBreadcrumbsAction;
