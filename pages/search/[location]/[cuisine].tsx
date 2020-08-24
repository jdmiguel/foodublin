import React, { useRef, useState, useEffect, Dispatch } from 'react';
import { NextPage, NextPageContext } from 'next';

import SearchPage from '../../../components/SearchPage/SearchPage';

import useWindowMeasures from '../../../components/hooks/useWindowMeasures';
import useScrollPosY from '../../../components/hooks/useScrollPosY';

import { getRestaurantsData } from '../../../services';

import {
  DUBLIN_ID,
  LOCATIONS,
  CUISINES,
  MAX_RESTAURANT_DISPLAYED,
  MAX_RESTAURANT_RETRIEVED,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '../../../helpers/staticData';
import {
  ListItemType,
  RestaurantType,
  EntityType,
} from '../../../helpers/types';
import { getFormattedUrlText } from '../../../helpers/utils';

export enum LocationType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

type SearchProps = {
  locationId: number;
  locationName: LocationType.CITY | LocationType.SUBZONE;
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
  cuisineId: number,
  start?: number,
  order?: string,
  sort?: string,
) => {
  const response = await getRestaurantsData({
    entity_id: locationId,
    entity_type:
      locationId === DUBLIN_ID ? EntityType.CITY : EntityType.SUBZONE,
    cuisines: cuisineId,
    start,
    order,
    sort,
  });
  const restaurants = getRestaurants(response.restaurants);

  return {
    total: response.results_found,
    restaurants: restaurants(getFormattedRestaurant),
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
  const loadedRestaurantsRef = useRef(0);
  const sortRef = useRef('');
  const orderRef = useRef('');

  const [currentRestaurants, setCurrentRestaurants]: [
    RestaurantType[],
    Dispatch<RestaurantType[]>,
  ] = useState(restaurants);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);

  const { width } = useWindowMeasures();
  const isMobile = width < 768;

  const maxRestaurantStarter =
    MAX_RESTAURANT_RETRIEVED - MAX_RESTAURANT_DISPLAYED;
  const currentTotal =
    total > MAX_RESTAURANT_RETRIEVED ? MAX_RESTAURANT_RETRIEVED : total;
  const showWarning =
    currentTotal >= MAX_RESTAURANT_RETRIEVED &&
    loadedRestaurantsRef.current >= maxRestaurantStarter;

  const handleFilter = async (sort: string, order: string) => {
    loadedRestaurantsRef.current = 0;
    setIsLoading(true);

    const restaurantsData = await handleGetRestaurantsData(
      locationId,
      cuisineId,
      0,
      sort,
      order,
    );

    sortRef.current = sort;
    orderRef.current = order;

    setCurrentRestaurants(restaurantsData.restaurants);
  };

  useScrollPosY(
    async ({ posY }) => {
      const { current: loaderRestaurants } = loadedRestaurantsRef;

      const initialFactor =
        loaderRestaurants <= MAX_RESTAURANT_DISPLAYED
          ? 0
          : loaderRestaurants - MAX_RESTAURANT_DISPLAYED;
      const offsetScrollDown =
        initialFactor *
        (MAX_RESTAURANT_RETRIEVED * (isMobile ? SCROLL_FACTOR : 1));
      const scrollDownLimit =
        posY >
        ((searchRef.current?.clientHeight as number) + offsetScrollDown) /
          SCROLL_FACTOR;

      const isRetrievingDataAllowed =
        loaderRestaurants < currentTotal &&
        loaderRestaurants <= maxRestaurantStarter;

      if (scrollDownLimit && !isLoading && isRetrievingDataAllowed) {
        setIsLoading(true);
        setIsLoadingByScroll(true);

        const restaurantsData = await handleGetRestaurantsData(
          locationId,
          cuisineId,
          loaderRestaurants,
          sortRef.current,
          orderRef.current,
        );

        setCurrentRestaurants([
          ...currentRestaurants,
          ...restaurantsData.restaurants,
        ]);
      }
    },
    [isLoading],
    SCROLL_DELAY,
  );

  useEffect(() => {
    loadedRestaurantsRef.current += MAX_RESTAURANT_DISPLAYED;
    setIsLoading(false);
    setIsLoadingByScroll(false);
  }, [currentRestaurants]);

  return (
    <SearchPage
      ref={searchRef}
      total={total}
      location={locationName}
      cuisine={cuisineName}
      restaurants={currentRestaurants}
      onClickFilter={handleFilter}
      onClickCard={() => setIsLoading(true)}
      isLoading={isLoading}
      isLoadingByScroll={isLoadingByScroll}
      showWarning={showWarning}
    />
  );
};

Search.getInitialProps = async ({ query }: CustomNextPageContext) => {
  const { location, cuisine } = query;

  const [locationId, locationName] = getValues(location, LOCATIONS);
  const [cuisineId, cuisineName] = getValues(cuisine, CUISINES);

  const restaurantsData = await handleGetRestaurantsData(locationId, cuisineId);

  return {
    locationId,
    locationName,
    cuisineId,
    cuisineName,
    total: restaurantsData.total,
    restaurants: restaurantsData.restaurants,
  };
};

export default Search;
