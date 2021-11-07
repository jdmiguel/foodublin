import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { FullLoader } from '@/components/ui/FullLoader/FullLoader';
import { Loader } from '@/components/core/Loader/Loader';
import { useBreadcrumbs } from '@/components/hooks/useBreadcrumbs';
import { DEFAULT_TEXT_LOADING } from '@/store/statics';
import { InitialAppState } from '@/store/redux/types';
import { BreadcrumbsType } from '@/components/core/types';

const DynamicFavoritesPage = dynamic(
  () => import('@/components/pages/FavoritesPage/FavoritesPage'),
  {
    // eslint-disable-next-line react/display-name
    loading: () => (
      <FullLoader>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
    ),
  },
);

const favoriteRoute = '/favorites';

const Favorites = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const router = useRouter();

  const { favorites } = useSelector((state: InitialAppState) => state);
  const favoritesBreadcrumbs = {
    text: 'Favorites',
    route: favoriteRoute,
    asRoute: favoriteRoute,
    type: BreadcrumbsType.FAVORITES,
  };
  const { breadcrumbs } = useBreadcrumbs(favoritesBreadcrumbs, 'favorites');

  return (
    <DynamicFavoritesPage
      total={favorites.length}
      restaurants={favorites}
      isNavigating={isNavigating}
      onNavigate={(route: string, asRoute?: string) => {
        route !== favoriteRoute && setIsNavigating(true);
        router.push(route, asRoute && asRoute);
      }}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default Favorites;
