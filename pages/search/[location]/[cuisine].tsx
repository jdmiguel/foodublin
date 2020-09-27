import React, { useRef, useState, useEffect, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage, NextPageContext } from 'next';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';
import SearchPage from '../../../components/pages/SearchPage/SearchPage';

import useWindowMeasures from '../../../components/hooks/useWindowMeasures';
import useScrollPosY from '../../../components/hooks/useScrollPosY';
import useBreadcrumbs from '../../../components/hooks/useBreadcrumbs';

import { setRelatedRestaurants } from '../../../store/actions';

import { getRestaurants } from '../../../services';

import {
  DUBLIN_ID,
  LOCATIONS,
  CUISINES,
  MAX_RESTAURANT_DISPLAYED,
  MIN_RESTAURANTS_LIST,
  MAX_RESTAURANT_RETRIEVED,
  MAX_SMALL_DEVICE_WIDTH,
  SCROLL_FACTOR,
  SCROLL_INITIAL_MOBILE_FACTOR,
  SCROLL_OFFSET_MOBILE_FACTOR,
  SCROLL_OFFSET_DESKTOP_FACTOR,
  SCROLL_DELAY,
} from '../../../helpers/staticData';
import {
  ListItem,
  Restaurant,
  EntityType,
  BreadcrumbsType,
} from '../../../helpers/types';
import {
  getFormattedUrlText,
  getCurrentRelatedRestaurants,
} from '../../../helpers/utils';

export enum LocationType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

type SearchProps = {
  locationId: number;
  locationName: LocationType.CITY | LocationType.SUBZONE;
  cuisineId: number;
  cuisineName: string;
  restaurants: Restaurant[] | undefined;
  total: number;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    location: string;
    cuisine: string;
  };
};

const getValues = (path: string, searchType: ListItem[]): any[] => {
  const value = searchType.find((item) => item.path === path);

  return [value?.id, value?.name];
};

const getRefinedRestaurant = (restaurant: any): Restaurant => ({
  id: restaurant.id,
  imgSrc: restaurant.thumb,
  title: restaurant.name,
  content: restaurant.location.locality,
  route: '/detail/[id]/[name]',
  asRoute: `/detail/${restaurant.id}/${getFormattedUrlText(
    restaurant.name,
    true,
  )}`,
});

const selectRestaurants = (restaurants: Restaurant[]) => (
  formattedFuntion: any,
) => restaurants.map((item: any) => formattedFuntion(item.restaurant));

const handleGetRestaurantsData = async (
  locationId: number,
  cuisineId: number,
  start?: number,
  sort?: string,
  order?: string,
) => {
  const { data, status } = await getRestaurants({
    entity_id: locationId,
    entity_type:
      locationId === DUBLIN_ID ? EntityType.CITY : EntityType.SUBZONE,
    cuisines: cuisineId,
    start,
    sort,
    order,
  });
  if (status === 200) {
    const restaurants = selectRestaurants(data.restaurants);

    return {
      restaurants: restaurants(getRefinedRestaurant),
      total: data.results_found,
    };
  }

  return {
    restaurants: undefined,
    total: 0,
  };
};

const Search: NextPage<SearchProps> = ({
  locationId,
  cuisineId,
  locationName,
  cuisineName,
  restaurants,
  total,
}) => {
  if (restaurants === undefined) {
    return <ErrorPage />;
  }
  const searchRef = useRef<HTMLDivElement>(null);
  const loadedRestaurantsRef = useRef(0);
  const sortRef = useRef('');
  const orderRef = useRef('');

  const [currentRestaurants, setCurrentRestaurants]: [
    Restaurant[],
    Dispatch<Restaurant[]>,
  ] = useState(restaurants);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);
  const [onError, setOnError] = useState(false);

  const dispatch = useDispatch();

  const { width } = useWindowMeasures();
  const isMobile = width < MAX_SMALL_DEVICE_WIDTH;

  const maxRestaurantStarter =
    MAX_RESTAURANT_RETRIEVED - MAX_RESTAURANT_DISPLAYED;
  const currentTotal =
    total > MAX_RESTAURANT_RETRIEVED ? MAX_RESTAURANT_RETRIEVED : total;
  const showWarning =
    currentTotal >= MAX_RESTAURANT_RETRIEVED &&
    loadedRestaurantsRef.current > maxRestaurantStarter;

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

    if (restaurantsData.restaurants) {
      sortRef.current = sort;
      orderRef.current = order;

      setIsLoading(false);
      setCurrentRestaurants(restaurantsData.restaurants);
    } else {
      setOnError(true);
    }
  };

  useScrollPosY(
    async ({ posY }) => {
      const { current: loaderRestaurants } = loadedRestaurantsRef;

      const initialFactor =
        loaderRestaurants <= MAX_RESTAURANT_DISPLAYED
          ? isMobile
            ? SCROLL_INITIAL_MOBILE_FACTOR
            : 0
          : loaderRestaurants - MAX_RESTAURANT_DISPLAYED;
      const offsetScrollDown =
        initialFactor *
        (MAX_RESTAURANT_RETRIEVED *
          (isMobile
            ? SCROLL_OFFSET_MOBILE_FACTOR
            : SCROLL_OFFSET_DESKTOP_FACTOR));
      const scrollDownLimit =
        posY >
        ((searchRef.current?.clientHeight as number) + offsetScrollDown) /
          SCROLL_FACTOR;

      const isRetrievingDataAllowed =
        loaderRestaurants < currentTotal &&
        loaderRestaurants <= maxRestaurantStarter;

      if (scrollDownLimit && !isLoading && isRetrievingDataAllowed) {
        setIsLoadingByScroll(true);

        const restaurantsData = await handleGetRestaurantsData(
          locationId,
          cuisineId,
          loaderRestaurants,
          sortRef.current,
          orderRef.current,
        );

        if (restaurantsData.restaurants) {
          setCurrentRestaurants([
            ...currentRestaurants,
            ...restaurantsData.restaurants,
          ]);
        } else {
          setOnError(true);
        }
      }
    },
    [isLoading],
    SCROLL_DELAY,
  );

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadedRestaurantsRef.current += MAX_RESTAURANT_DISPLAYED;
    setIsLoadingByScroll(false);
  }, [currentRestaurants]);

  const handleClickCard = (id: string) => {
    setIsLoading(true);

    if (currentRestaurants.length > MIN_RESTAURANTS_LIST) {
      const currentRelatedRestaurants = getCurrentRelatedRestaurants(
        currentRestaurants,
        id,
      );

      dispatch(setRelatedRestaurants(currentRelatedRestaurants));
    }
  };

  const searchBreadcrumbs = {
    text: `${cuisineName || 'Any food'} in ${locationName}`,
    route: '/search/[location]/[cuisine]',
    asRoute: `/search/${getFormattedUrlText(
      locationName,
      true,
    )}/${getFormattedUrlText(`${cuisineName || 'Any food'}`, true)}`,
    type: BreadcrumbsType.SEARCH,
  };
  useBreadcrumbs(searchBreadcrumbs, 'search');

  if (onError) {
    return <ErrorPage />;
  }

  return (
    <SearchPage
      ref={searchRef}
      total={total}
      location={locationName}
      cuisine={cuisineName}
      restaurants={currentRestaurants}
      onClickFilter={handleFilter}
      onClickCard={handleClickCard}
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
