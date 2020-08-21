import * as actionTypes from './actionTypes';

export const setCurrentRestaurantId = (id: number) => ({
  type: actionTypes.SET_CURRENT_RESTAURANT_ID,
  id,
});
