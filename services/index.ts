import axios, { AxiosError } from 'axios';

import { BASE_URL } from '../helpers/staticData';

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

export const getRestaurants = async (
  locationId: number,
  locationType: LocationType,
  cuisineId: number,
  start = 0,
): Promise<any> => {
  try {
    const response = await axios(`${BASE_URL}search`, {
      method: 'GET',
      headers: {
        'user-key': process.env.NEXT_PUBLIC_API_KEY,
        'content-type': 'application/json',
      },
      params: {
        entity_id: locationId,
        entity_type: locationType,
        cuisines: cuisineId,
        start,
      },
    });

    return { ...response.data };
  } catch (error) {
    return handleApiError(error);
  }
};
