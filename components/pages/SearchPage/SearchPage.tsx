import { Layout } from '../../layouts/Layout/Layout';
import { Filters } from '../../ui/Filters/Filters';
import { FullLoader } from '../../ui/FullLoader/FullLoader';
import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';
import { StyledSearchPage, StyledCardsWrapper } from './styles';
import { FILTERS, THUMB_GENERIC_SRC, DEFAULT_TEXT_LOADING } from '@/store/statics';
import { getTitleText } from '@/helpers/utils';
import { LoaderType, BreadcrumbsData } from '../../core/types';
import { Restaurant } from '../types';

type SearchPageProps = {
  total: number;
  area: string | null;
  cuisine: string | null;
  restaurants: Restaurant[];
  isLoadingByFilter: boolean;
  isLoadingByScroll: boolean;
  isNavigating: boolean;
  onClickFilter: (sort: string, order: string) => void;
  onClickCard: (route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

const SearchPage: React.FC<SearchPageProps> = ({
  total,
  area,
  cuisine,
  restaurants,
  onClickFilter,
  onClickCard,
  isLoadingByFilter,
  isLoadingByScroll,
  isNavigating,
  onNavigate,
  breadcrumbs,
}) => {
  const { totalText, restaurantText } = getTitleText(total);

  return (
    <Layout showFooterVeil={isLoadingByScroll} onNavigate={onNavigate} breadcrumbs={breadcrumbs}>
      <StyledSearchPage data-testid="search-page">
        <FullLoader isShown={isLoadingByFilter}>
          <Loader text={DEFAULT_TEXT_LOADING} />
        </FullLoader>
        <FullLoader isShown={isLoadingByScroll || isNavigating} type={LoaderType.LINE}>
          <Loader type={LoaderType.LINE} />
        </FullLoader>
        <Title text={`${totalText} ${cuisine || ''} ${restaurantText} in ${area}`} />
        {total > 0 && <Filters onClick={onClickFilter} data={FILTERS} />}
        <StyledCardsWrapper>
          {restaurants.map((restaurant) => (
            <div key={`${restaurant.id}-${restaurant.title}`}>
              <Card
                imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                title={restaurant.title}
                content={restaurant.content}
                onClick={() => {
                  onClickCard(restaurant.route, restaurant.asRoute);
                }}
              />
            </div>
          ))}
        </StyledCardsWrapper>
      </StyledSearchPage>
    </Layout>
  );
};

export default SearchPage;
