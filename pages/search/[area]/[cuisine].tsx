import { useRef, useState, useEffect, useCallback, Dispatch } from 'react';
import { NextPage, GetStaticPropsContext } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { useScroll } from '@/components/hooks/useScroll';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { BreadcrumbsType } from '@/components/core/types';
import { Area, Cuisine, FetchedRestaurant, Restaurant } from '@/components/pages/types';
import {
  DEFAULT_TEXT_LOADING,
  MAX_RESTAURANT_DISPLAYED,
  MAX_RESTAURANT_RETRIEVED,
  MIN_BIG_DEVICE_HEIGHT,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '@/store/statics';
import { getFormattedUrlText, inferStaticProps } from '@/helpers/utils';
import { getRestaurants } from '@/services/index';

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
});

const getValues = <T extends Area | Cuisine>(path: string, items: T[]): T =>
  items.find((item: Area | Cuisine) => item.path === path) || ({} as any);

const getRefinedRestaurant = (fetchedRestaurant: FetchedRestaurant): Restaurant => ({
  id: fetchedRestaurant.id,
  imgSrc: fetchedRestaurant.image_url,
  title: fetchedRestaurant.name,
  content: fetchedRestaurant.location.address1,
  route: '/details/[id]/[name]',
  asRoute: `/details/${fetchedRestaurant.id}/${getFormattedUrlText(fetchedRestaurant.name, true)}`,
});

const selectRestaurants =
  (fetchedRestaurants: FetchedRestaurant[]) =>
  (formattedFuntion: (fetchedRestaurant: FetchedRestaurant) => Restaurant) =>
    fetchedRestaurants.map((fetchedRestaurant: FetchedRestaurant) =>
      formattedFuntion(fetchedRestaurant),
    );

const handleGetRestaurants = async ({
  latitude,
  longitude,
  cuisine,
  offset = 0,
}: {
  latitude: number;
  longitude: number;
  cuisine: string;
  offset?: number;
}) => {
  const { restaurants, total } = await getRestaurants({
    latitude,
    longitude,
    cuisine,
    offset,
  });
  if (Array.isArray(restaurants)) {
    const formattedRestaurants = selectRestaurants(restaurants) || [];

    return {
      restaurants: formattedRestaurants(getRefinedRestaurant),
      total,
    };
  }

  return {
    restaurants: [],
    total: 0,
  };
};

const Search: NextPage<SearchProps> = ({
  areaName,
  latitude,
  longitude,
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
      let offset: number;

      switch (loadType) {
        case LoadType.EXTRA:
          setIsLoadingByScroll(true);
          offset = MAX_RESTAURANT_DISPLAYED;
          break;
        case LoadType.FILTER:
          setIsLoadingByFilter(true);
          offset = 0;
          loadedRestaurantsRef.current = 0;
          break;
        case LoadType.SCROLL:
          setIsLoadingByScroll(true);
          offset = loadedRestaurantsRef.current;
          break;
      }

      const { restaurants } = await handleGetRestaurants({
        latitude,
        longitude,
        cuisine: cuisineName,
        offset,
      });

      if (restaurants) {
        if (loadType === LoadType.FILTER) {
          setCurrentRestaurants(restaurants);
          setIsLoadingByFilter(false);
        } else {
          setCurrentRestaurants([...currentRestaurants, ...restaurants]);
          setIsLoadingByScroll(false);
        }
      } else {
        setIsOnError(true);
      }
    },
    [latitude, longitude, cuisineName, currentRestaurants],
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

  const handleClickCard = (route: string, asRoute: string) => {
    scrollDelayRef.current = 0;

    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const searchBreadcrumbs = {
    text: `${cuisineName || 'Any food'} in ${areaName}`,
    route: '/search/[area]/[cuisine]',
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
      cuisine: 'international',
    },
  }));

  return {
    paths: [...pathsWithoutCuisine, ...paths],
    fallback: true,
  };
};

export const getStaticProps = async ({
  params: { area, cuisine },
}: CustomGetStaticPropsContext) => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await readFile(jsonDirectory + '/data.json', 'utf8');
  const { areas, cuisines } = JSON.parse(fileContents);

  const { name: areaName, latitude, longitude } = getValues<Area>(area, areas);
  const { name: cuisineName, path: cuisinePath } = getValues<Cuisine>(cuisine, cuisines);

  const restaurantsData = await handleGetRestaurants({ latitude, longitude, cuisine: cuisinePath });

  return {
    props: {
      areaName,
      latitude,
      longitude,
      cuisineName: cuisineName ?? '',
      total: restaurantsData.total,
      restaurants: restaurantsData.restaurants,
    },
  };
};

/* export const getServerSideProps = async ({
  params: { area, cuisine },
}: CustomGetServerSidePropsContext) => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await readFile(jsonDirectory + '/data.json', 'utf8');
  const { areas, cuisines } = JSON.parse(fileContents);

  const { name: areaName, latitude, longitude } = getValues<Area>(area, areas);
  const { name: cuisineName, path: cuisinePath } = getValues<Cuisine>(cuisine, cuisines);

  const restaurantsData = await handleGetRestaurants({ latitude, longitude, cuisine: cuisinePath });

  return {
    props: {
      areaName,
      latitude,
      longitude,
      cuisineName: cuisineName ?? '',
      total: restaurantsData.total ?? 0,
      restaurants: restaurantsData.restaurants ?? [],
    },
  };
}; */

export default Search;
