import { DEFAULT_BREADCRUMB } from '../helpers/staticData';
import { Restaurant, BreadcrumbsData, Actions } from '../helpers/types';

export type InitialState = {
  favorites: Restaurant[];
  relatedRestaurants: Restaurant[];
  breadcrumbs: BreadcrumbsData[];
};

const initialState: InitialState = {
  favorites: [],
  relatedRestaurants: [],
  breadcrumbs: [DEFAULT_BREADCRUMB],
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case 'SET_RELATED_RESTAURANTS':
      return {
        ...state,
        relatedRestaurants: action.relatedRestaurants,
      };
    case 'CLEAR_RELATED_RESTAURANTS':
      return {
        ...state,
        relatedRestaurants: initialState.relatedRestaurants,
      };
    case 'ADD_BREADCRUMBS':
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs, action.breadcrumbs],
      };
    case 'REPLACE_BREADCRUMBS':
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
