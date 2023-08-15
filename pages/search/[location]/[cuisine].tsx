import { useRef, useState, useEffect, useCallback, Dispatch } from 'react';
import { NextPage, GetStaticPropsContext } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useScroll } from '@/components/hooks/useScroll';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import {
  DEFAULT_TEXT_LOADING,
  DUBLIN_ID,
  MAX_RESTAURANT_DISPLAYED,
  MIN_RESTAURANTS_LIST,
  MAX_RESTAURANT_RETRIEVED,
  MIN_BIG_DEVICE_HEIGHT,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '@/store/statics';
import { getFormattedUrlText, inferStaticProps } from '@/helpers/utils';
import { getRestaurants } from '@/services/index';
import { ListItem, BreadcrumbsType } from '@/components/core/types';
import { Restaurant, RawRestaurant, EntityType, Area } from '@/components/pages/types';

export enum AreaType {
  CITY = 'city',
  SUBZONE = 'subzone',
}

export enum LoadType {
  EXTRA = 'extra',
  FILTER = 'filter',
  SCROLL = 'scroll',
}

type SearchProps = inferStaticProps<typeof getStaticProps>;

type CustomGetStaticPropsContext = GetStaticPropsContext & {
  params: {
    area: string;
    cuisine: string;
  };
};

const DynamicSearchPage = dynamic(() => import('@/components/pages/SearchPage/SearchPage'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
}) as any;

const getValues = (path: string, searchType: ListItem[]): [number | null, string | null] => {
  const value = searchType.find((item) => item.path === path);

  return [value?.id || null, value?.name || null];
};

const getRefinedRestaurant = (rawRestaurant: RawRestaurant): Restaurant => ({
  id: rawRestaurant.restaurant.id,
  imgSrc: rawRestaurant.restaurant.thumb,
  title: rawRestaurant.restaurant.name,
  content: rawRestaurant.restaurant.location.locality,
  route: '/detail/[id]/[name]',
  asRoute: `/detail/${rawRestaurant.restaurant.id}/${getFormattedUrlText(
    rawRestaurant.restaurant.name,
    true,
  )}`,
});

const selectRestaurants =
  (rawRestaurants: RawRestaurant[]) =>
  (formattedFuntion: (rawRestaurant: RawRestaurant) => Restaurant) =>
    rawRestaurants.map((rawRestaurant: RawRestaurant) => formattedFuntion(rawRestaurant));

const handleGetRestaurants = async (
  areaId: number | null,
  cuisineId: number | null,
  start?: number,
  sort?: string,
  order?: string,
) => {
  const { rawRestaurants, total, status } = await getRestaurants({
    entity_id: areaId,
    entity_type: areaId === DUBLIN_ID ? EntityType.CITY : EntityType.SUBZONE,
    cuisines: cuisineId,
    start,
    sort,
    order,
  });
  if (status === 200) {
    const restaurants = selectRestaurants(rawRestaurants) || [];

    return {
      restaurants: restaurants(getRefinedRestaurant),
      total,
    };
  }

  return {
    restaurants: [],
    total: 0,
  };
};

const Search: NextPage<SearchProps> = ({
  areaId,
  cuisineId,
  areaName,
  cuisineName,
  restaurants,
  total,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const loadedRestaurantsRef = useRef(0);
  const sortRef = useRef('');
  const orderRef = useRef('');
  const scrollDelayRef = useRef(SCROLL_DELAY);

  const [currentRestaurants, setCurrentRestaurants]: [Restaurant[], Dispatch<Restaurant[]>] =
    useState(restaurants);
  const [isLoadingByFilter, setIsLoadingByFilter] = useState(false);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);
  const [isOnError, setIsOnError] = useState(false);
  const [isWarningShown, setIsWarningShown] = useState(false);

  const router = useRouter();

  const { windowHeight } = useWindowSize();

  const maxRestaurantStarter = MAX_RESTAURANT_RETRIEVED - MAX_RESTAURANT_DISPLAYED;
  const currentTotal = total > MAX_RESTAURANT_RETRIEVED ? MAX_RESTAURANT_RETRIEVED : total;

  const handleRestaurants = useCallback(
    async (loadType: LoadType) => {
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
        areaId,
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
          setCurrentRestaurants([...currentRestaurants, ...restaurantsData.restaurants]);
          setIsLoadingByScroll(false);
        }
      } else {
        setIsOnError(true);
      }
    },
    [areaId, cuisineId, currentRestaurants],
  );


  useScroll(
    async ({ scrollTop, scrollHeight, clientHeight }) => {
      const { current: loadedRestaurants } = loadedRestaurantsRef;
      const isScrollDownLimit = scrollTop >= (scrollHeight - clientHeight) / SCROLL_FACTOR;
      const isRetrievingDataAllowed =
        loadedRestaurants < currentTotal && loadedRestaurants <= maxRestaurantStarter;

      if (isScrollDownLimit && !isLoadingByScroll && isRetrievingDataAllowed) {
        handleRestaurants(LoadType.SCROLL);
      }
    },
    [isLoadingByScroll],
    scrollDelayRef.current,
  );

  useEffect(() => {
    if (windowHeight) {
      const isHighDevice = windowHeight >= MIN_BIG_DEVICE_HEIGHT;
      const areItemsToLoad = currentTotal > MAX_RESTAURANT_DISPLAYED;

      if (isHighDevice && areItemsToLoad && !isLoadingByFilter) {
        handleRestaurants(LoadType.EXTRA);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowHeight, isLoadingByFilter]);

  useEffect(() => {
    loadedRestaurantsRef.current += MAX_RESTAURANT_DISPLAYED;

    if (
      currentTotal >= MAX_RESTAURANT_RETRIEVED &&
      loadedRestaurantsRef.current > maxRestaurantStarter
    ) {
      setIsWarningShown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRestaurants]);

  const handleFilter = (sort: string, order: string) => {
    sortRef.current = sort;
    orderRef.current = order;

    setIsWarningShown(false);
    handleRestaurants(LoadType.FILTER);
  };

  const handleClickCard = (id: , route: string, asRoute: string) => {
    scrollDelayRef.current = 0;

    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const searchBreadcrumbs = {
    text: `${cuisineName || 'Any food'} in ${areaName}`,
    route: '/search/[location]/[cuisine]',
    asRoute: `/search/${getFormattedUrlText(`${areaName || 'Dublin'}`, true)}/${getFormattedUrlText(
      `${cuisineName || 'Any food'}`,
      true,
    )}`,
    type: BreadcrumbsType.SEARCH,
  };
  const { breadcrumbs } = useBreadcrumbs(searchBreadcrumbs, 'search');

  if (isOnError || !restaurants) {
    return <ErrorPage isNavigating={isNavigating} onNavigate={() => setIsNavigating(true)} />;
  }

  return (
    <DynamicSearchPage
      total={total}
      area={areaName}
      cuisine={cuisineName}
      restaurants={currentRestaurants}
      onClickFilter={handleFilter}
      onClickCard={handleClickCard}
      isLoadingByFilter={isLoadingByFilter}
      isLoadingByScroll={isLoadingByScroll}
      isNavigating={isNavigating}
      isWarningShown={isWarningShown}
      onNavigate={(route: string, asRoute?: string) => {
        setIsNavigating(true);
        router.push(route, asRoute && asRoute);
      }}
      breadcrumbs={breadcrumbs}
    />
  );
};

export const getStaticPaths = async () => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await readFile(jsonDirectory + '/data.json', 'utf8');
  const { areas, cuisines } = JSON.parse(fileContents);

  const areasLength = areas.length;
  const cuisinesLength = cuisines.length;

  const emptyPaths = new Array(areasLength * cuisinesLength).fill('', 0);

  let areasCounter = 0;
  let cuisinesCounter = 0;

  const getPaths = () => {
    if (cuisinesCounter < cuisinesLength) {
      cuisinesCounter++;
    } else {
      areasCounter++;
      cuisinesCounter = 0;
    }

    const updatedCuisineCounter = cuisinesCounter ? cuisinesCounter - 1 : cuisinesCounter;

    return {
      params: {
        area: areas[areasCounter].path,
        cuisine: cuisines[updatedCuisineCounter].path,
      },
    };
  };

  const paths = emptyPaths.map(getPaths);
  const pathsWithoutCuisine = areas.map((area: Area) => ({
    params: {
      area: area.path,
      cuisine: 'any-food',
    },
  }));

  return {
    paths: [...pathsWithoutCuisine, ...paths],
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { area, cuisine },
}: CustomGetStaticPropsContext) => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await readFile(jsonDirectory + '/data.json', 'utf8');
  const { areas, cuisines } = JSON.parse(fileContents);

  const [areaId, areaName] = getValues(area, areas);
  const [cuisineId, cuisineName] = getValues(cuisine, cuisines);

  const restaurantsData = await handleGetRestaurants(areaId, cuisineId);

  return {
    props: {
      areaId,
      areaName,
      cuisineId,
      cuisineName,
      total: restaurantsData.total,
      restaurants: restaurantsData.restaurants,
    },
  };
};

export default Search;
