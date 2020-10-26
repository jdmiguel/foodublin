import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../helpers/staticData';
import { RestaurantsRequestParams } from '../helpers/types';

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
): Promise<any> => {
  const currentParams = Object.entries(params).reduce(
    (acc: any, next: any[]) => {
      const [key, value] = next;
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );

  try {
    const response = await axios(`${BASE_URL}search`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: currentParams,
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRestaurant = async (res_id: number): Promise<any> => {
  try {
    const response = await axios(`${BASE_URL}restaurant`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: {
        res_id,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getReviews = async (res_id: number): Promise<any> => {
  try {
    const response = await axios(`${BASE_URL}reviews`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: {
        res_id,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    return handleApiError(error);
  }
};
