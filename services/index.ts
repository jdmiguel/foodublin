import axios, { AxiosError } from 'axios';
import {
  RestaurantsRequestParam,
  RestaurantsRequestParams,
  RawRestaurantDetail,
  RawRestaurant,
  RawReview,
} from '@/components/pages/types';

const BASE_API = 'https://developers.zomato.com/api/v2.1/';

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
    const response = await axios(`${BASE_API}search`, {
      method: 'GET',
      headers: {
        'user-key': `${process.env.NEXT_PUBLIC_ZOMATO_API_KEY}`,
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
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurant = async (
  res_id: number,
): Promise<{ rawRestaurantDetail: RawRestaurantDetail; status: number }> => {
  try {
    const response = await axios(`${BASE_API}restaurant?res_id=${res_id}`, {
      method: 'GET',
      headers: {
        'user-key': `${process.env.NEXT_PUBLIC_ZOMATO_API_KEY}`,
        'content-type': 'application/json',
      },
    });

    return { rawRestaurantDetail: response.data, status: response.status };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getReviews = async (
  res_id: number,
): Promise<{ rawReviews: RawReview[]; status: number }> => {
  try {
    const response = await axios(`${BASE_API}reviews?res_id=${res_id}`, {
      method: 'GET',
      headers: {
        'user-key': `${process.env.NEXT_PUBLIC_ZOMATO_API_KEY}`,
        'content-type': 'application/json',
      },
    });

    return { rawReviews: response.data.user_reviews, status: response.status };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};
