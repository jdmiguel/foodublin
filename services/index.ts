import axios, { AxiosError } from 'axios';

import {
  RestaurantsRequestParam,
  RestaurantsRequestParams,
  RawRestaurantDetail,
  RawRestaurant,
  RawReview,
} from '@/components/pages/types';

const handleApiError = (error: AxiosError) => {
  if (error.response) {
    const { data, status } = error.response;
    return {
      ...data,
      status,
    };
  }

  if (error.request) {
    return {
      status: 500,
    };
  }
};

export const getRestaurants = async (
  params: RestaurantsRequestParams,
): Promise<{
  rawRestaurants: RawRestaurant[];
  total: number;
  status: number;
}> => {
  const currentParams = Object.entries(params).reduce(
    (params: any, [key, value]: [string, RestaurantsRequestParam]) => {
      if (value) {
        params[key] = value;
      }
      return params;
    },
    {},
  );

  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_BASE_API}search`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: currentParams,
    });

    return {
      rawRestaurants: response.data.restaurants,
      total: response.data.results_found,
      status: response.status,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRestaurant = async (
  res_id: number,
): Promise<{ rawRestaurantDetail: RawRestaurantDetail; status: number }> => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_BASE_API}restaurant`,
      {
        method: 'GET',
        headers: {
          'user-key': process.env.NEXT_PUBLIC_API_KEY,
          'content-type': 'application/json',
        },
        params: {
          res_id,
        },
      },
    );

    return { rawRestaurantDetail: response.data, status: response.status };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getReviews = async (
  res_id: number,
): Promise<{ rawReviews: RawReview[]; status: number }> => {
  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_BASE_API}reviews`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: {
        res_id,
      },
    });

    return { rawReviews: response.data.user_reviews, status: response.status };
  } catch (error) {
    return handleApiError(error);
  }
};
