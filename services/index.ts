import axios, { AxiosError } from 'axios';
import {
  BASE_API,
  DUBLIN_COORDINATES,
  SEARCH_TERM_QUERY_PARAM,
  SEARCH_RADIUS_QUERY_PARAM,
  MAX_RESTAURANT_DISPLAYED,
} from '@/store/statics';
import {
  RestaurantsRequestParams,
  FetchedRestaurant,
  FetchedRestaurantDetails,
  Suggestion,
} from '@/components/pages/types';

const delayRequest = (ms = 3000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const customAxiosInstance = axios.create({
  baseURL: BASE_API,
});

customAxiosInstance.interceptors.response.use(async (response) => {
  if (process.env.NODE_ENV === 'production') {
    await delayRequest();
  }
  return response;
});

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

export const getRestaurantsOnClient = async ({
  latitude,
  longitude,
  cuisine = '',
  offset = 0,
}: RestaurantsRequestParams): Promise<{
  restaurants: FetchedRestaurant[];
  total: number;
}> => {
  const updatedLatitude = latitude || DUBLIN_COORDINATES.latitude;
  const updatedLongitude = longitude || DUBLIN_COORDINATES.longitude;

  try {
    const { data } = await axios.get(
      `/api/search?term=${SEARCH_TERM_QUERY_PARAM}&latitude=${updatedLatitude}&longitude=${updatedLongitude}&radius=${SEARCH_RADIUS_QUERY_PARAM}&categories=${cuisine}&offset=${offset}&limit=${MAX_RESTAURANT_DISPLAYED}`,
    );

    return {
      restaurants: data.businesses,
      total: data.total,
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantsOnServer = async ({
  latitude,
  longitude,
  cuisine = '',
  offset = 0,
}: RestaurantsRequestParams): Promise<{
  restaurants: FetchedRestaurant[];
  total: number;
}> => {
  const updatedLatitude = latitude || DUBLIN_COORDINATES.latitude;
  const updatedLongitude = longitude || DUBLIN_COORDINATES.longitude;

  try {
    const { data } = await customAxiosInstance(`${BASE_API}businesses/search`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: SEARCH_TERM_QUERY_PARAM,
        latitude: updatedLatitude,
        longitude: updatedLongitude,
        radius: SEARCH_RADIUS_QUERY_PARAM,
        categories: cuisine,
        offset,
        limit: MAX_RESTAURANT_DISPLAYED,
      },
    });

    return {
      restaurants: data.businesses,
      total: data.total,
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};

export const getRestaurantDetails = async (
  id: string,
): Promise<{ details: FetchedRestaurantDetails }> => {
  try {
    const { data: detailsData } = await axios(`${BASE_API}businesses/${id}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    const { data: reviewsData } = await axios(`${BASE_API}businesses/${detailsData.id}/reviews`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'x-requested-with': 'xmlhttprequest',
        accept: 'application/json',
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    return {
      details: { ...detailsData, ...reviewsData },
    };
  } catch (error) {
    console.log({ error });
    return handleApiError(error as AxiosError);
  }
};
