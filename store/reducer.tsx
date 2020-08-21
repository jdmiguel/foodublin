import * as actionTypes from './actionTypes';

import { RestaurantsState } from '../helpers/types';

const initialState: RestaurantsState = {
  relatedRestaurants: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_RELATED_RESTAURANTS:
      return {
        ...state,
        relatedRestaurants: action.relatedRestaurants,
      };
    default:
      return state;
  }
};

export default reducer;
