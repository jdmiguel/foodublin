import { useRef, useState } from 'react';
import { NextPage, GetStaticPropsContext } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ErrorPage from '@/components/pages/ErrorPage/ErrorPage';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useScroll } from '@/components/hooks/useScroll';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { BreadcrumbsType } from '@/components/core/types';
import { Area, Cuisine, FetchedRestaurant, Restaurant } from '@/components/pages/types';
import {
  DEFAULT_TEXT_LOADING,
  MAX_RESTAURANT_DISPLAYED,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '@/store/statics';
import { getFormattedUrlText, inferStaticProps } from '@/helpers/utils';
import { getRestaurantsOnServer, getRestaurantsOnClient } from '@/services/index';

export enum LoadType {
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
  isClientRequest = false,
  latitude,
  longitude,
  cuisine,
  offset = 0,
}: {
  isClientRequest?: boolean;
  latitude: number;
  longitude: number;
  cuisine: string;
  offset?: number;
}) => {
  const getRestaurants = isClientRequest ? getRestaurantsOnClient : getRestaurantsOnServer;
  const { restaurants, total } = await getRestaurants({
    isClientRequest,
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
  cuisinePath,
  cuisineName,
  restaurants: initialRestaurants,
  total,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const sortRef = useRef('');
  const orderRef = useRef('');
  const scrollDelayRef = useRef(SCROLL_DELAY);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [isLoadingByFilter, setIsLoadingByFilter] = useState(false);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);
  const [isOnError, setIsOnError] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  const router = useRouter();

  const handleRestaurantsOnClient = async (loadType: LoadType) => {
    let offset = 0;

    if (loadType === LoadType.FILTER) {
      setIsLoadingByFilter(true);
    } else {
      offset = currentOffset + MAX_RESTAURANT_DISPLAYED;
      setIsLoadingByScroll(true);
    }

    setCurrentOffset(offset);

    const { restaurants } = await handleGetRestaurants({
      isClientRequest: true,
      latitude,
      longitude,
      cuisine: cuisinePath,
      offset,
    });

    if (restaurants) {
      if (loadType === LoadType.FILTER) {
        setRestaurants(restaurants);
        setIsLoadingByFilter(false);
      } else {
        setRestaurants((prevRestaurants) => [...prevRestaurants, ...restaurants]);
        setIsLoadingByScroll(false);
      }
    } else {
      setIsOnError(true);
    }
  };

  useScroll(
    async ({ scrollTop, scrollHeight, clientHeight }) => {
      const isScrollDownLimit = scrollTop >= (scrollHeight - clientHeight) / SCROLL_FACTOR;
      const isRetrievingDataAllowed = currentOffset + MAX_RESTAURANT_DISPLAYED < total;

      if (isScrollDownLimit && !isLoadingByScroll && isRetrievingDataAllowed) {
        handleRestaurantsOnClient(LoadType.SCROLL);
      }
    },
    [isLoadingByScroll, currentOffset],
    scrollDelayRef.current,
  );

  const handleFilter = (sort: string, order: string) => {
    sortRef.current = sort;
    orderRef.current = order;
    handleRestaurantsOnClient(LoadType.FILTER);
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
      restaurants={restaurants}
      onClickFilter={handleFilter}
      onClickCard={handleClickCard}
      isLoadingByFilter={isLoadingByFilter}
      isLoadingByScroll={isLoadingByScroll}
      isNavigating={isNavigating}
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

  const updatedCuisinePath = cuisinePath ?? '';
  const updatedCuisineName = cuisineName ?? '';

  const restaurantsData = await handleGetRestaurants({
    latitude,
    longitude,
    cuisine: cuisinePath,
  });

  return {
    props: {
      areaName,
      latitude,
      longitude,
      cuisinePath: updatedCuisinePath,
      cuisineName: updatedCuisineName,
      total: restaurantsData.total,
      restaurants: restaurantsData.restaurants,
    },
  };
};

export default Search;
