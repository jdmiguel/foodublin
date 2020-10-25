import React, { useRef, useState, useEffect, Dispatch } from 'react';

import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useDispatch } from 'react-redux';

import ErrorPage from '../../../components/pages/ErrorPage/ErrorPage';

import { FullLoader } from '../../../components/ui/FullLoader/FullLoader';

import { Loader } from '../../../components/core/Loader/Loader';

import { useWindowMeasurement } from '../../../components/hooks/useWindowMeasurement';
import { useScroll } from '../../../components/hooks/useScroll';
import { useBreadcrumbs } from '../../../components/hooks/useBreadcrumbs';

import { setRelatedRestaurants } from '../../../store/actions';

import { getRestaurants } from '../../../services';

import {
  DEFAULT_TEXT_LOADING,
  DUBLIN_ID,
  LOCATIONS,
  CUISINES,
  MAX_RESTAURANT_DISPLAYED,
  MIN_RESTAURANTS_LIST,
  MAX_RESTAURANT_RETRIEVED,
  MIN_BIG_DEVICE_HEIGHT,
  SCROLL_FACTOR,
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

export enum LoadType {
  EXTRA = 'extra',
  FILTER = 'filter',
  SCROLL = 'scroll',
}

type SearchProps = {
  locationId: number;
  locationName: LocationType.CITY | LocationType.SUBZONE;
  cuisineId: number;
  cuisineName: string;
  restaurants: Restaurant[] | null;
  total: number;
};

type CustomNextPageContext = NextPageContext & {
  query: {
    location: string;
    cuisine: string;
  };
};

const DynamicSearchPage = dynamic(
  () => import('../../../components/pages/SearchPage/SearchPage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

const getValues = (
  path: string,
  searchType: ListItem[],
): [number | null, string | null] => {
  const value = searchType.find((item) => item.path === path);

  return [value?.id || null, value?.name || null];
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

const handleGetRestaurants = async (
  locationId: number | null,
  cuisineId: number | null,
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
    restaurants: null,
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
  if (!restaurants) {
    return <ErrorPage />;
  }

  const loadedRestaurantsRef = useRef(0);
  const sortRef = useRef('');
  const orderRef = useRef('');
  const scrollDelayRef = useRef(SCROLL_DELAY);

  const [currentRestaurants, setCurrentRestaurants]: [
    Restaurant[],
    Dispatch<Restaurant[]>,
  ] = useState(restaurants);
  const [isLoadingByFilter, setIsLoadingByFilter] = useState(false);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);
  const [onError, setOnError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  const { height } = useWindowMeasurement();

  const maxRestaurantStarter =
    MAX_RESTAURANT_RETRIEVED - MAX_RESTAURANT_DISPLAYED;
  const currentTotal =
    total > MAX_RESTAURANT_RETRIEVED ? MAX_RESTAURANT_RETRIEVED : total;

  const handleRestaurants = async (loadType: LoadType) => {
    let start: number;

    switch (loadType) {
      case LoadType.EXTRA:
        setIsLoadingByScroll(true);
        start = MAX_RESTAURANT_DISPLAYED;
        break;
      case LoadType.FILTER:
        setIsLoadingByFilter(true);
        start = 0;
        loadedRestaurantsRef.current = 0;
        break;
      case LoadType.SCROLL:
        setIsLoadingByScroll(true);
        start = loadedRestaurantsRef.current;
        break;
    }

    const restaurantsData = await handleGetRestaurants(
      locationId,
      cuisineId,
      start,
      sortRef.current,
      orderRef.current,
    );

    if (restaurantsData.restaurants) {
      if (loadType === LoadType.FILTER) {
        setCurrentRestaurants(restaurantsData.restaurants);
        setIsLoadingByFilter(false);
      } else {
        setCurrentRestaurants([
          ...currentRestaurants,
          ...restaurantsData.restaurants,
        ]);
        setIsLoadingByScroll(false);
      }
    } else {
      setOnError(true);
    }
  };

  useScroll(
    async ({ scrollTop, scrollHeight, clientHeight }) => {
      const { current: loadedRestaurants } = loadedRestaurantsRef;
      const isScrollDownLimit =
        scrollTop >= (scrollHeight - clientHeight) / SCROLL_FACTOR;
      const isRetrievingDataAllowed =
        loadedRestaurants < currentTotal &&
        loadedRestaurants <= maxRestaurantStarter;

      if (isScrollDownLimit && !isLoadingByScroll && isRetrievingDataAllowed) {
        handleRestaurants(LoadType.SCROLL);
      }
    },
    [isLoadingByScroll],
    scrollDelayRef.current,
  );

  useEffect(() => {
    if (height >= MIN_BIG_DEVICE_HEIGHT && !isLoadingByFilter) {
      handleRestaurants(LoadType.EXTRA);
    }
  }, [height, isLoadingByFilter]);

  useEffect(() => {
    loadedRestaurantsRef.current += MAX_RESTAURANT_DISPLAYED;

    if (
      currentTotal >= MAX_RESTAURANT_RETRIEVED &&
      loadedRestaurantsRef.current > maxRestaurantStarter
    ) {
      setShowWarning(true);
    }
  }, [currentRestaurants]);

  const handleFilter = (sort: string, order: string) => {
    sortRef.current = sort;
    orderRef.current = order;

    handleRestaurants(LoadType.FILTER);
  };

  const handleClickCard = (id: string, route: string, asRoute: string) => {
    scrollDelayRef.current = 0;

    if (currentRestaurants.length > MIN_RESTAURANTS_LIST) {
      const currentRelatedRestaurants = getCurrentRelatedRestaurants(
        currentRestaurants,
        id,
      );

      dispatch(setRelatedRestaurants(currentRelatedRestaurants));
    }

    router.push(route, asRoute);
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
    <DynamicSearchPage
      total={total}
      location={locationName}
      cuisine={cuisineName}
      restaurants={currentRestaurants}
      onClickFilter={handleFilter}
      onClickCard={handleClickCard}
      isLoading={isLoadingByFilter}
      isLoadingByScroll={isLoadingByScroll}
      showWarning={showWarning}
    />
  );
};

export const getServerSideProps = async ({ query }: CustomNextPageContext) => {
  const { location, cuisine } = query;

  const [locationId, locationName] = getValues(location, LOCATIONS);
  const [cuisineId, cuisineName] = getValues(cuisine, CUISINES);

  const restaurantsData = await handleGetRestaurants(locationId, cuisineId);

  return {
    props: {
      locationId,
      locationName,
      cuisineId,
      cuisineName,
      total: restaurantsData.total,
      restaurants: restaurantsData.restaurants,
    },
  };
};

export default Search;
