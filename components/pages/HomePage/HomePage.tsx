import { Layout } from '../../layouts/Layout/Layout';
import { FullLoader } from '../../ui/FullLoader/FullLoader';
import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';
import { StyledHighlights, StyledHighlightWrapper } from './styles';
import { LoaderType, CardType, BreadcrumbsData } from '../../core/types';
import { HighlightRestaurant } from '../types';

type HomePageProps = {
  highlights: HighlightRestaurant[];
  isNavigating: boolean;
  clickHighlight: (id: number, route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
  breadcrumbs: BreadcrumbsData[];
};

const HomePage: React.FC<HomePageProps> = ({
  highlights,
  clickHighlight,
  isNavigating,
  onNavigate,
  breadcrumbs,
}) => (
  <Layout isExtendedHeader={true} onNavigate={onNavigate} breadcrumbs={breadcrumbs}>
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
                clickHighlight(restaurant.id, restaurant.route, restaurant.asRoute);
              }}
            />
          </div>
        ))}
      </StyledHighlightWrapper>
    </StyledHighlights>
  </Layout>
);

export default HomePage;
