import React from 'react';
import { NextPage, NextPageContext } from 'next';

import SearchPage from '../../../components/SearchPage/SearchPage';

import { getRestaurants } from '../../../services';

import { LOCATIONS, CUISINES, DUBLIN_ID } from '../../../helpers/staticData';
import { ListItemType, RestaurantType } from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

type SearchProps = {
  locationName: string;
  cuisineName: string;
  total: number;
  restaurants: RestaurantType[];
};

type CustomNextPageContext = NextPageContext & {
  query: {
    location: string;
    cuisine: string;
  };
};

const getValues = (path: string, searchType: ListItemType[]): any => {
  const value = searchType.find((item) => item.path === path);

  return [value?.id, value?.name];
};

const Search: NextPage<SearchProps> = ({
  locationName,
  cuisineName,
  total,
  restaurants,
}) => {
  return (
    <SearchPage
      total={total}
      location={locationName}
      cuisine={cuisineName}
      restaurants={restaurants}
    />
  );
};

Search.getInitialProps = async ({ query }: CustomNextPageContext) => {
  const { location, cuisine } = query;

  const [locationId, locationName] = getValues(location, LOCATIONS);
  const [cuisineId, cuisineName] = getValues(cuisine, CUISINES);

  const response = await getRestaurants(
    locationId,
    locationId === DUBLIN_ID ? 'city' : 'subzone',
    cuisineId,
  );
  const total = response.results_found;
  const restaurants = response.restaurants.map((restaurant: any) => ({
    id: restaurant.restaurant.id,
    imgSrc: restaurant.restaurant.thumb,
    title: restaurant.restaurant.name,
    link: getFormattedUrlText(restaurant.restaurant.name, true),
    firstText: restaurant.restaurant.location.locality,
  }));

  return { locationName, cuisineName, total, restaurants };
};

export default Search;
