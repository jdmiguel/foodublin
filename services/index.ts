import axios, { AxiosError } from 'axios';
import { DUBLIN_COORDINATES } from '@/store/statics';
import {
  RestaurantsRequestParams,
  FetchedRestaurant,
  FetchedRestaurantDetails,
  Suggestion,
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
    /*  const { data, status } = await axios.get(
      `http://127.0.0.1:3000/api/search?latitude=${updatedLatitude}&longitude=${updatedLongitude}&cuisine=${cuisine}&offset=${offset}`,
    ); */
    const response = await fetch(
      `http:localhost:3000/api/search?latitude=${updatedLatitude}&longitude=${updatedLongitude}&cuisine=${cuisine}&offset=${offset}`,
    );
    const data = await response.json();

    return {
      restaurants: data.businesses,
      total: data.total,
      status: response.status,
    };
  } catch (error) {
    console.log('error');
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantDetails = async (
  id: string,
): Promise<{ details: FetchedRestaurantDetails; status: number }> => {
  try {
    //const response = await axios.get(`http://127.0.0.1:3000/api/details?id=${id}`);
    const response = await fetch(`http:localhost:3000/api/details?id=${id}`);
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
