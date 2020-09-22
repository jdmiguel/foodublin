import React from 'react';
import { useSelector } from 'react-redux';

import FavoritesPage from '../components/pages/FavoritesPage/FavoritesPage';

import { InitialState } from '../store/reducer';

const Favorites = () => {
  const favorites = useSelector((state: InitialState) => state.favorites);

  return <FavoritesPage total={favorites.length} restaurants={favorites} />;
};

export default Favorites;
