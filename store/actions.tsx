import { Restaurant, BreadcrumbsData } from '../helpers/types';

export const setFavourite = (favorite: Restaurant) => ({
  type: 'SET_FAVORITE',
  favorite,
});

export const setRelatedRestaurants = (relatedRestaurants: Restaurant[]) => ({
  type: 'SET_RELATED_RESTAURANTS',
  relatedRestaurants,
});

export const clearRelatedRestaurants = () => ({
  type: 'CLEAR_RELATED_RESTAURANTS',
});

export const addBreadcrumbs = (breadcrumbs: BreadcrumbsData) => ({
  type: 'ADD_BREADCRUMBS',
  breadcrumbs,
});

export const replaceBreadcrumbs = (
  index: number,
  breadcrumbs: BreadcrumbsData,
) => ({
  type: 'REPLACE_BREADCRUMBS',
  index,
  breadcrumbs,
});
