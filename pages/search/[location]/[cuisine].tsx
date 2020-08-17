import React, { useRef, useState, useEffect, Dispatch } from 'react';
import { NextPage, NextPageContext } from 'next';

import SearchPage from '../../../components/SearchPage/SearchPage';

import useWindowMeasures from '../../../components/hooks/useWindowMeasures';
import useScrollPosY from '../../../components/hooks/useScrollPosY';

import { getRestaurantsData } from '../../../services';

import {
  LOCATIONS,
  CUISINES,
  DUBLIN_ID,
  MAX_RESTAURANT_DISPLAYED,
  MAX_RESTAURANT_RETRIEVED,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '../../../helpers/staticData';
import {
  ListItemType,
  RestaurantType,
  LocationType,
} from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

type SearchProps = {
  locationId: number;
  locationName: LocationType;
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

const getRestaurants = (restaurants: RestaurantType[]) => (
  formattedFuntion: any,
) => restaurants.map((item: any) => formattedFuntion(item.restaurant));

const handleGetRestaurantsData = async (
  locationId: number,
  locationName: LocationType,
  cuisineId: number,
  start = 0,
  order = '',
  sort = '',
) => {
  const response = await getRestaurantsData(
    locationId,
    locationName,
    cuisineId,
    start,
    order,
    sort,
  );
  const restaurants = getRestaurants(response.restaurants);

  return {
    total: response.results_found,
    formattedRestaurants: restaurants(getFormattedRestaurant),
  };
};

const Search: NextPage<SearchProps> = ({
  locationId,
  cuisineId,
  locationName,
  cuisineName,
  total,
  restaurants,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const loadedRestaurants = useRef(0);
  const currentSort = useRef('');
  const currentOrder = useRef('');

  const [currentRestaurants, setCurrentRestaurants]: [
    RestaurantType[],
    Dispatch<RestaurantType[]>,
  ] = useState(restaurants);
  const [isLoading, setIsLoading] = useState(false);

  const { width } = useWindowMeasures();
  const isMobile = width < 768;

  const handleFilter = async (sort: string, order: string) => {
    loadedRestaurants.current = 0;
    setIsLoading(true);
    currentSort.current = sort;
    currentOrder.current = order;

    const restaurantsData = await handleGetRestaurantsData(
      locationId,
      locationName,
      cuisineId,
      0,
      currentSort.current,
      currentOrder.current,
    );

    setCurrentRestaurants(restaurantsData.formattedRestaurants);
  };

  useScrollPosY(
    async ({ posY }) => {
      const osffsetScrollDown =
        loadedRestaurants.current *
        (MAX_RESTAURANT_RETRIEVED * (isMobile ? SCROLL_FACTOR : 1));
      const scrollDownLimit =
        posY >
        ((searchRef.current?.clientHeight as number) + osffsetScrollDown) /
          SCROLL_FACTOR;
      const currentTotal =
        total > MAX_RESTAURANT_RETRIEVED
          ? MAX_RESTAURANT_RETRIEVED - MAX_RESTAURANT_DISPLAYED
          : total;
      const isRetrievingDataAllowed = loadedRestaurants.current < currentTotal;

      if (scrollDownLimit && !isLoading && isRetrievingDataAllowed) {
        setIsLoading(true);

        const restaurantsData = await handleGetRestaurantsData(
          locationId,
          locationName,
          cuisineId,
          (loadedRestaurants.current += MAX_RESTAURANT_DISPLAYED),
          currentSort.current,
          currentOrder.current,
        );

        setCurrentRestaurants([
          ...currentRestaurants,
          ...restaurantsData.formattedRestaurants,
        ]);
      }
    },
    [isLoading],
    SCROLL_DELAY,
  );

  useEffect(() => {
    setIsLoading(false);
  }, [currentRestaurants]);

  return (
    <SearchPage
      ref={searchRef}
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

  const restaurantsData = await handleGetRestaurantsData(
    locationId,
    locationId === DUBLIN_ID ? 'city' : 'subzone',
    cuisineId,
  );

  return {
    locationId,
    locationName,
    cuisineId,
    cuisineName,
    total: restaurantsData.total,
    restaurants: restaurantsData.formattedRestaurants,
  };
};

export default Search;
