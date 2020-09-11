import * as actionTypes from './actionTypes';

import { Restaurant, BreadcrumbsData } from '../helpers/types';

export type InitialState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

const initialState: InitialState = {
  favorites: [],
  relatedRestaurants: [],
  breadcrumbs: [{ text: 'Home', route: '/', asRoute: '/' }],
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
    case actionTypes.ADD_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.breadcrumbs],
      };
    default:
      return state;
  }
};

export default reducer;
