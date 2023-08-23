import { useState } from 'react';
import { NextPage, InferGetStaticPropsType } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { DEFAULT_TEXT_LOADING, DEFAULT_BREADCRUMB } from '@/store/statics';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const DynamicHomePage = dynamic(() => import('@/components/views/Home'), {
  loading: () => (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ),
}) as any;

const homeRoute = '/';

const Home: NextPage<HomeProps> = ({ areas, cuisines, highlights }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const handleClickHighlight = (route: string, asRoute: string) => {
    setIsNavigating(true);
    router.push(route, asRoute);
  };

  const { breadcrumbs } = useBreadcrumbs(DEFAULT_BREADCRUMB, 'home');

  return (
    <DynamicHomePage
      clickHighlight={handleClickHighlight}
      areas={areas}
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
  const { areas, cuisines, highlights } = JSON.parse(fileContents);

  return {
    props: {
      areas,
      cuisines,
      highlights,
    },
  };
};

export default Home;
