import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import DetailPage from '../../../components/DetailPage/DetailPage';

import { InitialState } from '../../../store/reducer';
import {
  clearRelatedRestaurants,
  addBreadcrumbs,
} from '../../../store/actions';

import { RestaurantDetail } from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

import { getRestaurantData } from '../../../services';

type DetailProps = {
  data: RestaurantDetail;
  id: number;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    id: number;
  };
};

const Detail: NextPage<DetailProps> = ({ data, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const relatedRestaurants = useSelector(
    (state: InitialState) => state.relatedRestaurants,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
  }, [id]);

  const { name, imgSrc } = data;
  const detailBreadcrumbs = {
    text: name,
    route: '/detail/[id]/[name]',
    asRoute: `/detail/${id}/${getFormattedUrlText(name, true)}`,
  };

  useEffect(() => {
    dispatch(addBreadcrumbs(detailBreadcrumbs));
  }, []);

  const handleClickRelatedRestaurant = () => {
    setIsLoading(true);
    dispatch(clearRelatedRestaurants());
  };

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

  const restaurantData = await getRestaurantData(id);

  const filteredData: RestaurantDetail = {
    imgSrc: restaurantData.featured_image,
    name: restaurantData.name,
    location: restaurantData.location.locality,
    cuisines: restaurantData.cuisines,
    timings: restaurantData.timings,
    rating: restaurantData.user_rating.aggregate_rating,
    votes: restaurantData.user_rating.votes,
    average: restaurantData.average_cost_for_two,
    establishment: restaurantData.establishment[0],
    highlights: restaurantData.highlights,
    phone: restaurantData.phone_numbers,
    address: restaurantData.location.address,
  };

  return {
    data: filteredData,
    id,
  };
};

export default Detail;
