import * as actionTypes from './actionTypes';

import { CardType } from '../helpers/types';

export const setFavourite = (favorite: CardType[]) => ({
  type: actionTypes.SET_FAVORITE,
  favorite,
});
