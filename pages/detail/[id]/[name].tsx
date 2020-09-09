import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';

import DetailPage from '../../../components/DetailPage/DetailPage';

import { RestaurantDetail } from '../../../helpers/types';

import { getRestaurantData } from '../../../services';

type DetailProps = {
  data: RestaurantDetail;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    id: number;
  };
};

const Detail: NextPage<DetailProps> = ({ data }) => (
  <>
    <Head>
      <link rel="preload" as="image" href={data.imgSrc} />
    </Head>
    <DetailPage data={data} />
  </>
);

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
  };
};

export default Detail;
