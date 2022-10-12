import { useState } from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { server } from '@/config/index';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { setRelatedRestaurants } from '@/store/redux/actions';
import { DEFAULT_TEXT_LOADING, DEFAULT_BREADCRUMB, HIGHLIGHTED_RESTAURANTS } from '@/store/statics';
import { getCurrentRelatedRestaurants } from '@/helpers/utils';
import { HighlightRestaurant } from '@/components/pages/types';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const DynamicHomePage = dynamic(() => import('@/components/pages/HomePage/HomePage'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
});

const homeRoute = '/';

const Home: NextPage<HomeProps> = ({ highlights }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClickHighlight = (id: number, route: string, asRoute: string) => {
    const currentRelatedRestaurants = getCurrentRelatedRestaurants(HIGHLIGHTED_RESTAURANTS, id);

    dispatch(setRelatedRestaurants(currentRelatedRestaurants));

    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const { breadcrumbs } = useBreadcrumbs(DEFAULT_BREADCRUMB, 'home');

  return (
    <DynamicHomePage
      clickHighlight={handleClickHighlight}
      highlights={highlights}
      isNavigating={isNavigating}
      onNavigate={(route: string, asRoute?: string) => {
        route !== homeRoute && setIsNavigating(true);
        router.push(route, asRoute && asRoute);
      }}
      breadcrumbs={breadcrumbs}
    />
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`${server}/api/highlights`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': '*',
    },
  });
  const highlights: HighlightRestaurant[] = await response.json();

  return {
    props: {
      highlights,
    },
  };
};

export default Home;
