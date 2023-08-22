import { useRef, useState } from 'react';
import { NextPage, GetStaticPropsContext } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import ErrorPage from '@/components/views/Error';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useScroll } from '@/components/hooks/useScroll';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { BreadcrumbsType, FilterType } from '@/components/core/types';
import {
  Area,
  Cuisine,
  SearchBasicParams,
  FetchedRestaurant,
  Restaurant,
  SearchUserAction,
} from '@/helpers/types';
import {
  DEFAULT_TEXT_LOADING,
  MAX_RESTAURANT_DISPLAYED,
  SCROLL_FACTOR,
  SCROLL_DELAY,
} from '@/store/statics';
import { getFormattedUrlText, inferStaticProps } from '@/helpers/utils';
import { getRestaurantsOnServer, getRestaurantsOnClient } from '@/services/index';

type SearchProps = inferStaticProps<typeof getStaticProps>;

type CustomGetStaticPropsContext = GetStaticPropsContext & {
  params: {
    area: string;
    cuisine: string;
  };
};

const DynamicSearchPage = dynamic(() => import('@/components/views/Search'), {
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

const fetchRestaurantsOnClient = async ({
  latitude,
  longitude,
  cuisine,
  offset = 0,
  sortBy,
}: SearchBasicParams) => {
  const { restaurants, total } = await getRestaurantsOnClient({
    latitude,
    longitude,
    cuisine,
    offset,
    sortBy,
  });
  const formattedRestaurants = selectRestaurants(restaurants) || [];
  const refinedRestaurants = formattedRestaurants(getRefinedRestaurant);

  return {
    restaurants: refinedRestaurants,
    total,
  };
};

const Search: NextPage<SearchProps> = ({
  areaName,
  latitude,
  longitude,
  cuisinePath,
  cuisineName,
  restaurants: initialRestaurants,
  total: initialTotal,
}) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(initialRestaurants);
  const [isLoadingByFilter, setIsLoadingByFilter] = useState(false);
  const [isLoadingByScroll, setIsLoadingByScroll] = useState(false);
  const [isOnError, setIsOnError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(initialTotal);

  const filter = useRef<FilterType | undefined>();

  const router = useRouter();

  useScroll(
    async ({ scrollTop, scrollHeight, clientHeight }) => {
      const isScrollDownLimit = scrollTop >= (scrollHeight - clientHeight) / SCROLL_FACTOR;
      const isRetrievingDataAllowed = offset + MAX_RESTAURANT_DISPLAYED < total;

      if (isScrollDownLimit && !isLoadingByScroll && isRetrievingDataAllowed) {
        handleRestaurantsOnClient('scroll');
      }
    },
    [isLoadingByScroll, offset],
    SCROLL_DELAY,
  );

  const handleRestaurantsOnClient = async (userAction: SearchUserAction) => {
    const isFilterAction = userAction === 'filter';

    let updatedOffset: number;

    if (isFilterAction) {
      updatedOffset = 0;
      setIsLoadingByFilter(true);
    } else {
      updatedOffset = offset + MAX_RESTAURANT_DISPLAYED;
      setIsLoadingByScroll(true);
    }
    setOffset(updatedOffset);

    const { restaurants, total: fetchedTotal } = await fetchRestaurantsOnClient({
      latitude,
      longitude,
      cuisine: cuisinePath,
      offset: updatedOffset,
      sortBy: filter.current,
    });

    if (restaurants) {
      setTotal(fetchedTotal);
      if (isFilterAction) {
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

  const handleClickCard = (route: string, asRoute: string) => {
    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const handleFilter = (newFilter: FilterType | undefined) => {
    filter.current = newFilter;
    handleRestaurantsOnClient('filter');
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

  const { restaurants, total } = await getRestaurantsOnServer({
    latitude,
    longitude,
    cuisine: cuisinePath,
  });

  const formattedRestaurants = selectRestaurants(restaurants);
  const refinedRestaurants = formattedRestaurants(getRefinedRestaurant);

  return {
    props: {
      areaName,
      latitude,
      longitude,
      cuisinePath: updatedCuisinePath,
      cuisineName: updatedCuisineName,
      total: total ?? 0,
      restaurants: refinedRestaurants ?? 0,
    },
  };
};

export default Search;
