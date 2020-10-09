import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { HomePage } from '../components/pages/HomePage/HomePage';

import { useBreadcrumbs } from '../components/hooks/useBreadcrumbs';

import { setRelatedRestaurants } from '../store/actions';

import {
  DEFAULT_BREADCRUMB,
  HIGHLIGHTED_RESTAURANTS,
} from '../helpers/staticData';
import { getCurrentRelatedRestaurants } from '../helpers/utils';

const index = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleClickHighlight = (id: string, route: string, asRoute: string) => {
    setIsLoading(true);

    const currentRelatedRestaurants = getCurrentRelatedRestaurants(
      HIGHLIGHTED_RESTAURANTS,
      id,
    );

    dispatch(setRelatedRestaurants(currentRelatedRestaurants));

    router.push(route, asRoute);
  };

  useBreadcrumbs(DEFAULT_BREADCRUMB, 'home');

  return (
    <HomePage
      isLoading={isLoading}
      clickHighlight={handleClickHighlight}
      highlights={HIGHLIGHTED_RESTAURANTS}
    />
  );
};

export default index;
