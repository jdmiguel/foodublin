import { useState, useEffect } from 'react';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';
import { Layout } from '../../layouts/Layout/Layout';
import { FullLoader } from '../../ui/FullLoader/FullLoader';
import { Loader } from '../../core/Loader/Loader';
import { StyledFavoritesPage, StyledTitleLoading, StyledCardsWrapper } from './styles';
import { THUMB_GENERIC_SRC, DEFAULT_TEXT_LOADING } from '@/store/statics';
import { getTitleText } from '@/helpers/utils';
import { LoaderType, BreadcrumbsData } from '../../core/types';
import { Restaurant } from '../../../helpers/types';

type FavoritesPageProps = {
  restaurants: Restaurant[];
  total: number;
  isNavigating: boolean;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  total,
  restaurants,
  isNavigating,
  onNavigate,
  breadcrumbs,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const { totalText, restaurantText } = getTitleText(total);

  useEffect(() => {
    setIsloading(false);
  }, []);

  return (
    <Layout onNavigate={onNavigate} breadcrumbs={breadcrumbs}>
      <StyledFavoritesPage>
        <FullLoader isShown={isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        {isLoading ? (
          <StyledTitleLoading>{DEFAULT_TEXT_LOADING}</StyledTitleLoading>
        ) : (
          <Title text={`${totalText} ${restaurantText} saved in your favorites`} />
        )}
        <StyledCardsWrapper>
          {restaurants.map((restaurant) => (
            <div key={`${restaurant.id}-${restaurant.title}`}>
              <Card
                imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                title={restaurant.title}
                content={restaurant.content}
                onClick={() => {
                  onNavigate(restaurant.route, restaurant.asRoute);
                }}
              />
            </div>
          ))}
        </StyledCardsWrapper>
      </StyledFavoritesPage>
    </Layout>
  );
};

export default FavoritesPage;
