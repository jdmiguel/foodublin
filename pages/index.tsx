import React from 'react';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useDispatch } from 'react-redux';

import { FullLoader } from '../components/ui/FullLoader/FullLoader';

import { Loader } from '../components/core/Loader/Loader';

import { useBreadcrumbs } from '../components/hooks/useBreadcrumbs';

import { setRelatedRestaurants } from '../store/actions';

import {
  DEFAULT_TEXT_LOADING,
  DEFAULT_BREADCRUMB,
  HIGHLIGHTED_RESTAURANTS,
} from '../helpers/staticData';
import { getCurrentRelatedRestaurants } from '../helpers/utils';

const DynamicHomePage = dynamic(
  () => import('../components/pages/HomePage/HomePage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

const index = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClickHighlight = (id: number, route: string, asRoute: string) => {
    const currentRelatedRestaurants = getCurrentRelatedRestaurants(
      HIGHLIGHTED_RESTAURANTS,
      id,
    );

    dispatch(setRelatedRestaurants(currentRelatedRestaurants));

    router.push(route, asRoute);
  };

  useBreadcrumbs(DEFAULT_BREADCRUMB, 'home');

  return (
    <DynamicHomePage
      clickHighlight={handleClickHighlight}
      highlights={HIGHLIGHTED_RESTAURANTS}
    />
  );
};

export default index;
