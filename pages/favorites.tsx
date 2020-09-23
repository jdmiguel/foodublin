import React from 'react';
import { useSelector } from 'react-redux';

import FavoritesPage from '../components/pages/FavoritesPage/FavoritesPage';

import useBreadcrumbs from '../components/hooks/useBreadcrumbs';

import { InitialState } from '../store/reducer';

import { BreadcrumbsType } from '../helpers/types';

const Favorites = () => {
  const { favorites } = useSelector((state: InitialState) => state);

  const favoritesBreadcrumbs = {
    text: 'Favorites',
    route: '/favorites',
    asRoute: '/favorites',
    type: BreadcrumbsType.FAVORITES,
  };
  useBreadcrumbs(favoritesBreadcrumbs);

  return <FavoritesPage total={favorites.length} restaurants={favorites} />;
};

export default Favorites;
