import * as actionTypes from './actionTypes';

import { Restaurant } from '../helpers/types';

export type InitialState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
};

const initialState: InitialState = {
  favorites: [],
  relatedRestaurants: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case actionTypes.SET_RELATED_RESTAURANTS:
      return {
        ...state,
        relatedRestaurants: action.relatedRestaurants,
      };
    case actionTypes.CLEAR_RELATED_RESTAURANTS:
      return {
        ...state,
        relatedRestaurants: [],
      };
    default:
      return state;
  }
};

export default reducer;
