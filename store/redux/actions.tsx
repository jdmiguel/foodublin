import { Restaurant } from '@/components/pages/types';
import { BreadcrumbsData } from '@/components/core/types';

export const addFavorite = (favorite: Restaurant) => ({
  type: 'ADD_FAVORITE',
  favorite,
});

export const deleteFavorite = (id: string) => ({
  type: 'DELETE_FAVORITE',
  id,
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

export const replaceBreadcrumbs = (index: number, breadcrumbs: BreadcrumbsData) => ({
  type: 'REPLACE_BREADCRUMBS',
  index,
  breadcrumbs,
});
