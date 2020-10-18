import React, { useEffect } from 'react';

import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { useSelector, useDispatch } from 'react-redux';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';

import { FullLoader } from '../../../components/ui/FullLoader/FullLoader';

import { Loader } from '../../../components/core/Loader/Loader';

import { useBreadcrumbs } from '../../../components/hooks/useBreadcrumbs';

import {
  clearRelatedRestaurants,
  addFavorite,
  deleteFavorite,
} from '../../../store/actions';

import { DEFAULT_TEXT_LOADING } from '../../../helpers/staticData';
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

const DynamicDetailPage = dynamic(
  () => import('../../../components/pages/DetailPage/DetailPage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

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

  const { favorites, relatedRestaurants } = useSelector(
    (state: InitialAppState) => state,
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const stringifiedId = `${id}`;
  const isFavorite = favorites.some(
    (favorite) => favorite.id === stringifiedId,
  );

  useEffect(() => {
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
      <DynamicDetailPage
        data={data}
        isFavorite={isFavorite}
        relatedRestaurants={relatedRestaurants}
        onClickSaveButton={handleSaveButton}
        onClickRelatedRestaurant={(route: string, asRoute: string) =>
          router.push(route, asRoute)
        }
      />
    </>
  );
};

export const getServerSideProps = async ({ query }: CustomNextPageContext) => {
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
      props: {
        data: filteredData,
        id,
      },
    };
  }

  return {
    props: {
      data: undefined,
      id,
    },
  };
};

export default Detail;
