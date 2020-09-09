import * as actionTypes from './actionTypes';

import { Restaurant } from '../helpers/types';

export const setFavourite = (favorite: Restaurant[]) => ({
  type: actionTypes.SET_FAVORITE,
  favorite,
});

export const setRelatedRestaurants = (relatedRestaurants: Restaurant[]) => ({
  type: actionTypes.SET_RELATED_RESTAURANTS,
  relatedRestaurants,
});
