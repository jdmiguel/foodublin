import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import FavoritesPage from '../components/pages/FavoritesPage/FavoritesPage';

import useBreadcrumbs from '../components/hooks/useBreadcrumbs';

import { InitialAppState, BreadcrumbsType } from '../helpers/types';

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { favorites } = useSelector((state: InitialAppState) => state);
  const favoritesBreadcrumbs = {
    text: 'Favorites',
    route: '/favorites',
    asRoute: '/favorites',
    type: BreadcrumbsType.FAVORITES,
  };
  useBreadcrumbs(favoritesBreadcrumbs, 'favorites');

  return (
    <FavoritesPage
      isLoading={isLoading}
      total={favorites.length}
      restaurants={favorites}
      clickRestaurant={() => setIsLoading(true)}
    />
  );
};

export default Favorites;
