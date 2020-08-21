import * as actionTypes from './actionTypes';

import { CardType } from '../helpers/types';

type InitialState = {
  relatedRestaurants: CardType[];
};

const initialState: InitialState = {
  relatedRestaurants: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_RELATED_RESTAURANTS:
      return {
        relatedRestaurants: action.relatedRestaurants,
      };
    default:
      return state;
  }
};

export default reducer;
