import * as actionTypes from './actionTypes';

import { Restaurant, BreadcrumbsData } from '../helpers/types';

export const setFavourite = (favorite: Restaurant[]) => ({
  type: actionTypes.SET_FAVORITE,
  favorite,
});

export const setRelatedRestaurants = (relatedRestaurants: Restaurant[]) => ({
  type: actionTypes.SET_RELATED_RESTAURANTS,
  relatedRestaurants,
});

export const clearRelatedRestaurants = () => ({
  type: actionTypes.CLEAR_RELATED_RESTAURANTS,
});

export const addBreadcrumbs = (breadcrumbs: BreadcrumbsData) => ({
  type: actionTypes.ADD_BREADCRUMBS,
  breadcrumbs,
});

export const deleteLastBreadcrumbs = () => ({
  type: actionTypes.DELETE_LAST_BREADCRUMBS,
});

export const setInitialBreadcrumbs = () => ({
  type: actionTypes.SET_INITIAL_BREADCRUMBS,
});
