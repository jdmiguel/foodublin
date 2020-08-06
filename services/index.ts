import axios, { AxiosError } from 'axios';

import { BASE_URL, MAX_RESTAURANT_DISPLAYED } from '../helpers/staticData';

type LocationType = 'subzone' | 'city';

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

export const getRestaurantsData = async (
  locationId: number | undefined,
  locationType: LocationType,
  cuisineId: number | undefined,
  search = '',
  sort = '',
  order = '',
  start = 0,
): Promise<any> => {
  const paramsRequest = {
    entity_id: locationId,
    entity_type: locationType,
    cuisines: cuisineId,
    count: MAX_RESTAURANT_DISPLAYED,
    q: search,
    start,
    sort,
    order,
  };

  const currentParamsRequest = Object.entries(paramsRequest).reduce(
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
      params: currentParamsRequest,
    });

    return { ...response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
