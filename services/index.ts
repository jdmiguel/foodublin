import axios, { AxiosError } from 'axios';
import {
  BASE_API,
  DUBLIN_COORDINATES,
  SEARCH_TERM_QUERY_PARAM,
  SEARCH_RADIUS_QUERY_PARAM,
  MAX_RESTAURANT_DISPLAYED,
} from '@/store/statics';
import {
  SearchRequestParams,
  SearchBasicParams,
  FetchedRestaurant,
  FetchedRestaurantDetails,
  Suggestion,
} from '@/helpers/types';
import { FilterType } from '@/components/core/types';

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

const getFormattedUrlBySort = (url: string, sortBy: FilterType) => {
  let newUrl = url;

  if (sortBy === 'high_cost') {
    newUrl += '&price=3';
    newUrl += '&price=4';
  }
  if (sortBy === 'low_cost') {
    newUrl += '&price=1';
    newUrl += '&price=2';
  }
  if (sortBy === 'rating') {
    newUrl += '&sort_by=rating';
  }
  if (sortBy === 'distance') {
    newUrl += '&sort_by=distance';
  }

  return newUrl;
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
  sortBy,
}: SearchBasicParams): Promise<{
  restaurants: FetchedRestaurant[];
  total: number;
}> => {
  const updatedLatitude = latitude || DUBLIN_COORDINATES.latitude;
  const updatedLongitude = longitude || DUBLIN_COORDINATES.longitude;

  const requestUrl = `/api/search?latitude=${updatedLatitude}&longitude=${updatedLongitude}&term=${SEARCH_TERM_QUERY_PARAM}&categories=${cuisine}&radius=${SEARCH_RADIUS_QUERY_PARAM}&offset=${offset}&limit=${MAX_RESTAURANT_DISPLAYED}`;

  const updatedRequestUrl = sortBy ? getFormattedUrlBySort(requestUrl, sortBy) : requestUrl;

  try {
    const { data } = await axios.get(updatedRequestUrl);

    return {
      restaurants: data.businesses ?? [],
      total: data.total ?? 0,
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
}: SearchRequestParams): Promise<{
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
      restaurants: data.businesses ?? [],
      total: data.total ?? 0,
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
