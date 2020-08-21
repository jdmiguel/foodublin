import * as actionTypes from './actionTypes';

import { CardType } from '../helpers/types';

export const setRelatedRestaurants = (relatedRestaurants: CardType[]) => ({
  type: actionTypes.SET_RELATED_RESTAURANTS,
  relatedRestaurants,
});
