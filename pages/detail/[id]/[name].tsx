import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';
import DetailPage from '../../../components/pages/DetailPage/DetailPage';

import useBreadcrumbs from '../../../components/hooks/useBreadcrumbs';

import { InitialState } from '../../../store/reducer';
import { clearRelatedRestaurants } from '../../../store/actions';

import { RestaurantDetail, BreadcrumbsType } from '../../../helpers/types';
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

const Detail: NextPage<DetailProps> = ({ data, id }) => {
  if (data === undefined) {
    return <ErrorPage />;
  }

  const { name, imgSrc } = data;

  const { relatedRestaurants } = useSelector((state: InitialState) => state);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickRelatedRestaurant = () => {
    setIsLoading(true);
  };

  const detailBreadcrumbs = {
    text: name,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(name, true)}`,
    type: BreadcrumbsType.DETAIL,
  };

  useBreadcrumbs(detailBreadcrumbs);

  useEffect(() => {
    setIsLoading(false);
    return () => {
      dispatch(clearRelatedRestaurants());
    };
  }, [id]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={imgSrc} />
      </Head>
      <DetailPage
        data={data}
        isLoading={isLoading}
        relatedRestaurants={relatedRestaurants}
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
