import * as actionTypes from './actionTypes';

const initialState: any = {
  currentRestaurantId: 0,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_RESTAURANT_ID:
      return {
        currentRestaurantId: action.id,
      };
    default:
      return state;
  }
};

export default reducer;
