import axios, { AxiosError } from 'axios';
import {
  RestaurantsRequestParam,
  RestaurantsRequestParams,
  RawRestaurantDetail,
  RawRestaurant,
  BasicRestaurant,
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
    const response = await axios(`${BASE_API}businesses/search`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      params: { location: 'dublin', term: 'restaurants', sort_by: 'best_match', ...currentParams },
    });

    return {
      rawRestaurants: response.data.businesses,
      total: response.data.results_found,
      status: response.status,
    };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantsBySearchText = async (
  searchText: string,
): Promise<{
  restaurants: BasicRestaurant[];
  status: number;
}> => {
  try {
    const { data, status } = await axios.get(`/api/autocomplete?searchText=${searchText}`);

    return {
      restaurants: data,
      status,
    };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantDetails = async (
  id: string,
): Promise<{ details: RawRestaurantDetail; status: number }> => {
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/details?id=${id}`);
    //const response = await fetch(`http:localhost:3000/api/detail?id=${id}`);
    //const data = await response.json();

    return {
      details: response.data,
      status: response.status,
    };
  } catch (error) {
    console.log({ error });
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
        'user-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
        'content-type': 'application/json',
      },
    });

    return { rawReviews: response.data.user_reviews, status: response.status };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};
