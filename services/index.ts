import axios, { AxiosError } from 'axios';
import { BASE_API, DUBLIN_COORDINATES } from '@/store/statics';
import {
  RestaurantsRequestParams,
  FetchedRestaurant,
  FetchedRestaurantDetails,
  Suggestion,
} from '@/components/pages/types';

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http:localhost:3000/' : 'https://foodublin.vercel.app/';

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

export const getSuggestionsBySearchText = async (
  searchText: string,
): Promise<{
  suggestions: Suggestion[];
  status: number;
}> => {
  try {
    const { data, status } = await axios.get(
      `/api/autocomplete?searchText=${searchText}&latitude=${DUBLIN_COORDINATES.latitude}&longitude=${DUBLIN_COORDINATES.longitude}`,
    );

    return {
      suggestions: data,
      status,
    };
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurants = async ({
  latitude,
  longitude,
  cuisine = '',
  offset = 0,
}: RestaurantsRequestParams): Promise<{
  restaurants: FetchedRestaurant[];
  total: number;
  status: number;
}> => {
  const updatedLatitude = latitude || DUBLIN_COORDINATES.latitude;
  const updatedLongitude = longitude || DUBLIN_COORDINATES.longitude;

  try {
    const { data, status } = await axios(`${BASE_API}businesses/search`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'restaurants',
        latitude: updatedLatitude,
        longitude: updatedLongitude,
        radius: 1000,
        categories: cuisine,
        offset,
        limit: 20,
      },
    });

    return {
      restaurants: data.businesses,
      total: data.total,
      status,
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantDetails = async (
  id: string,
): Promise<{ details: FetchedRestaurantDetails; status: number }> => {
  try {
    //const response = await axios.get(`http://127.0.0.1:3000/api/details?id=${id}`);
    const response = await fetch(`${baseURL}/api/details?id=${id}`);
    const data = await response.json();

    return {
      details: data,
      status: response.status,
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};
