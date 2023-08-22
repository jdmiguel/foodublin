import { Layout } from '../../layouts/Layout/Layout';
import { FullLoader } from '../../ui/FullLoader/FullLoader';
import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';
import { LoaderType, CardType, BreadcrumbsData } from '../../core/types';
import { Area, Cuisine, HighlightRestaurant } from '../../../helpers/types';
import { StyledHighlights, StyledHighlightWrapper } from './styles';

type HomePageProps = {
  areas: Area[];
  cuisines: Cuisine[];
  highlights: HighlightRestaurant[];
  isNavigating: boolean;
  clickHighlight: (route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

const HomePage: React.FC<HomePageProps> = ({
  areas,
  cuisines,
  highlights,
  clickHighlight,
  isNavigating,
  onNavigate,
  breadcrumbs,
}) => (
  <Layout
    areas={areas}
    cuisines={cuisines}
    isExtendedHeader={true}
    onNavigate={onNavigate}
    breadcrumbs={breadcrumbs}
  >
    <FullLoader isShown={isNavigating} type={LoaderType.LINE}>
      <Loader type={LoaderType.LINE} />
    </FullLoader>
    <StyledHighlights data-testid="highlights">
      <Title text="Featured restaurants" />
      <StyledHighlightWrapper>
        {highlights.map((restaurant) => (
          <div key={restaurant.id}>
            <Card
              imgSrc={restaurant.featuredSrc}
              title={restaurant.title}
              content={restaurant.content}
              type={CardType.HIGHLIGHT}
              onClick={() => {
                clickHighlight(restaurant.route, restaurant.asRoute);
              }}
            />
          </div>
        ))}
      </StyledHighlightWrapper>
    </StyledHighlights>
  </Layout>
);

export default HomePage;
