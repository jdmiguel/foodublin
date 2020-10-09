import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { FavoritesPage } from '../components/pages/FavoritesPage/FavoritesPage';

import { useBreadcrumbs } from '../components/hooks/useBreadcrumbs';

import { InitialAppState, BreadcrumbsType } from '../helpers/types';

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleClickRestaurant = (route: string, asRoute: string) => {
    setIsLoading(true);

    router.push(route, asRoute);
  };

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
      clickRestaurant={handleClickRestaurant}
    />
  );
};

export default Favorites;
