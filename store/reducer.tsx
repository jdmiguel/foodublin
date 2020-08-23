import * as actionTypes from './actionTypes';

import { FavoriteState } from '../helpers/types';

const initialState: FavoriteState = {
  favorites: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    default:
      return state;
  }
};

export default reducer;
