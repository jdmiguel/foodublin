import { useState } from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { setRelatedRestaurants } from '@/store/redux/actions';
import { DEFAULT_TEXT_LOADING, DEFAULT_BREADCRUMB } from '@/store/statics';
import { getCurrentRelatedRestaurants } from '@/helpers/utils';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const DynamicHomePage = dynamic(() => import('@/components/pages/HomePage/HomePage'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
});

const homeRoute = '/';

const Home: NextPage<HomeProps> = ({ locations, cuisines, highlights }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleClickHighlight = (id: number, route: string, asRoute: string) => {
    const currentRelatedRestaurants = getCurrentRelatedRestaurants(highlights, id);

    dispatch(setRelatedRestaurants(currentRelatedRestaurants));

    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const { breadcrumbs } = useBreadcrumbs(DEFAULT_BREADCRUMB, 'home');

  return (
    <DynamicHomePage
      clickHighlight={handleClickHighlight}
      locations={locations}
      cuisines={cuisines}
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
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await readFile(jsonDirectory + '/data.json', 'utf8');
  const { locations, cuisines, highlights } = JSON.parse(fileContents);

  return {
    props: {
      locations,
      cuisines,
      highlights,
    },
  };
};

export default Home;
