import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';
import DetailPage from '../../../components/pages/DetailPage/DetailPage';

import { useBreadcrumbs } from '../../../components/hooks/useBreadcrumbs';

import {
  clearRelatedRestaurants,
  addFavorite,
  deleteFavorite,
} from '../../../store/actions';

import {
  InitialAppState,
  RestaurantDetail,
  Restaurant,
  BreadcrumbsType,
} from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

import { getRestaurant } from '../../../services';

type DetailProps = {
  data: RestaurantDetail | undefined;
  id: number;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    id: number;
  };
};

const getRefinedRestaurant = (
  id: string,
  restaurant: RestaurantDetail,
): Restaurant => ({
  id,
  imgSrc: restaurant.thumbSrc,
  title: restaurant.name,
  content: restaurant.location,
  route: '/detail/[id]/[name]',
  asRoute: `/detail/${id}/${getFormattedUrlText(restaurant.name, true)}`,
});

const Detail: NextPage<DetailProps> = ({ data, id }) => {
  if (data === undefined) {
    return <ErrorPage />;
  }

  const [isLoading, setIsLoading] = useState(true);

  const { favorites, relatedRestaurants } = useSelector(
    (state: InitialAppState) => state,
  );
  const dispatch = useDispatch();

  const stringifiedId = `${id}`;
  const isFavorite = favorites.some(
    (favorite) => favorite.id === stringifiedId,
  );

  useEffect(() => {
    setIsLoading(false);
    return () => {
      dispatch(clearRelatedRestaurants());
    };
  }, [id]);

  const handleSaveButton = (action: string) => {
    const favorite = getRefinedRestaurant(stringifiedId, data);
    dispatch(
      action === 'save' ? addFavorite(favorite) : deleteFavorite(stringifiedId),
    );
  };

  const handleClickRelatedRestaurant = () => {
    setIsLoading(true);
  };

  const { name, imgSrc } = data;
  const detailBreadcrumbs = {
    text: name,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(name, true)}`,
    type: BreadcrumbsType.DETAIL,
  };
  useBreadcrumbs(detailBreadcrumbs, stringifiedId);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={imgSrc} />
      </Head>
      <DetailPage
        data={data}
        isLoading={isLoading}
        isFavorite={isFavorite}
        relatedRestaurants={relatedRestaurants}
        onClickSaveButton={handleSaveButton}
        onClickRelatedRestaurant={handleClickRelatedRestaurant}
      />
    </>
  );
};

Detail.getInitialProps = async ({ query }: CustomNextPageContext) => {
  const { id } = query;

  const { data, status } = await getRestaurant(id);

  if (status === 200) {
    const filteredData: RestaurantDetail = {
      imgSrc: data.featured_image,
      thumbSrc: data.thumb,
      name: data.name,
      location: data.location.locality,
      cuisines: data.cuisines,
      timings: data.timings,
      rating: data.user_rating.aggregate_rating,
      votes: data.user_rating.votes,
      average: data.average_cost_for_two,
      establishment: data.establishment[0],
      highlights: data.highlights,
      phone: data.phone_numbers,
      address: data.location.address,
    };

    return {
      data: filteredData,
      id,
    };
  }

  return {
    data: undefined,
    id,
  };
};

export default Detail;
