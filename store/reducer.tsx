import { InitialAppState, Actions } from '@helpers/types';

const appReducer = (state: InitialAppState, action: Actions) => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.id,
        ),
      };
    case 'SET_RELATED_RESTAURANTS':
      return {
        ...state,
        relatedRestaurants: action.relatedRestaurants,
      };
    case 'CLEAR_RELATED_RESTAURANTS':
      return {
        ...state,
        relatedRestaurants: [],
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

export default appReducer;
