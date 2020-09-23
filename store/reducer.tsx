import * as actionTypes from './actionTypes';

import {
  HIGHLIGHTED_RESTAURANTS,
  DEFAULT_BREADCRUMB,
} from '../helpers/staticData';
import { Restaurant, BreadcrumbsData } from '../helpers/types';

export type InitialState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

const initialState: InitialState = {
  favorites: HIGHLIGHTED_RESTAURANTS,
  relatedRestaurants: [],
  breadcrumbs: [DEFAULT_BREADCRUMB],
};

const reducer = (state = initialState, action: actionTypes.Actions) => {
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
        relatedRestaurants: initialState.relatedRestaurants,
      };
    case actionTypes.ADD_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.breadcrumbs],
      };
    case actionTypes.REPLACE_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: [
          ...state.breadcrumbs.slice(0, action.index),
          action.breadcrumbs,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
