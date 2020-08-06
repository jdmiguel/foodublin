import React, { useState, Dispatch } from 'react';
import { NextPage, NextPageContext } from 'next';

import SearchPage from '../../../components/SearchPage/SearchPage';

import { getRestaurantsData } from '../../../services';

import { LOCATIONS, CUISINES, DUBLIN_ID } from '../../../helpers/staticData';
import { ListItemType, RestaurantType } from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

// TO DO
// Add Loader feature
// Add remove filter by clicking active filter

type SearchProps = {
  locationId: number;
  locationName: string;
  cuisineId: number;
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

const getValues = (path: string, searchType: ListItemType[]): any[] => {
  const value = searchType.find((item) => item.path === path);

  return [value?.id, value?.name];
};

const getFormattedRestaurant = (restaurant: any) => ({
  id: restaurant.id,
  imgSrc: restaurant.thumb,
  title: restaurant.name,
  link: getFormattedUrlText(restaurant.name, true),
  firstText: restaurant.location.locality,
});

const getRestaurants = (restaurants: any) => (formattedFuntion: any) =>
  restaurants.map((item: any) => formattedFuntion(item.restaurant));

const Search: NextPage<SearchProps> = ({
  locationId,
  cuisineId,
  locationName,
  cuisineName,
  total,
  restaurants,
}) => {
  const [currentRestaurants, setCurrentRestaurants]: [
    RestaurantType[],
    Dispatch<RestaurantType[]>,
  ] = useState(restaurants);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = async (sort: string, order: string) => {
    setIsLoading(true);

    const response = await getRestaurantsData(
      locationId,
      locationId === DUBLIN_ID ? 'city' : 'subzone',
      cuisineId,
      '',
      sort,
      order,
    );
    const restaurants = getRestaurants(response.restaurants);
    const formattedRestaurants = restaurants(getFormattedRestaurant);

    setCurrentRestaurants(formattedRestaurants);
    setIsLoading(false);
  };

  return (
    <SearchPage
      total={total}
      location={locationName}
      cuisine={cuisineName}
      restaurants={currentRestaurants}
      onClickFilter={handleFilter}
      isLoading={isLoading}
    />
  );
};

Search.getInitialProps = async ({ query }: CustomNextPageContext) => {
  const { location, cuisine } = query;

  const [locationId, locationName] = getValues(location, LOCATIONS);
  const [cuisineId, cuisineName] = getValues(cuisine, CUISINES);

  const response = await getRestaurantsData(
    locationId,
    locationId === DUBLIN_ID ? 'city' : 'subzone',
    cuisineId,
  );
  const total = response.results_found;
  const restaurants = getRestaurants(response.restaurants);
  const formattedRestaurants = restaurants(getFormattedRestaurant);

  return {
    locationId,
    locationName,
    cuisineId,
    cuisineName,
    total,
    restaurants: formattedRestaurants,
  };
};

export default Search;
