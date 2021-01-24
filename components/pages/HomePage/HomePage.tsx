import React from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { StyledHighlights, StyledHighlightWrapper } from './styles';

import { LoaderType, CardType } from '../../core/types';
import { HighlightRestaurant } from '../types';

type HomePageProps = {
  highlights: HighlightRestaurant[];
  isNavigating: boolean;
  clickHighlight: (id: number, route: string, asRoute: string) => void;
  onNavigate: (route: string, asRoute?: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({
  highlights,
  clickHighlight,
  isNavigating,
  onNavigate,
}) => (
  <Layout
    isExtendedHeader={true}
    isExtendedFooter={true}
    onNavigate={onNavigate}
  >
    <StyledHighlights data-testid="highlights" className="grid-container">
      <FullLoader isShowed={isNavigating} type={LoaderType.LINE}>
        <Loader type={LoaderType.LINE} />
      </FullLoader>
      <Title text="Featured restaurants" />
      <StyledHighlightWrapper className="grid-x grid-margin-x grid-margin-y">
        {highlights.map((restaurant) => (
          <div key={restaurant.id} className="cell small-12 medium-6 large-4">
            <Card
              imgSrc={restaurant.featuredSrc}
              title={restaurant.title}
              content={restaurant.content}
              type={CardType.HIGHLIGHT}
              onClick={() => {
                clickHighlight(
                  restaurant.id,
                  restaurant.route,
                  restaurant.asRoute,
                );
              }}
            />
          </div>
        ))}
      </StyledHighlightWrapper>
    </StyledHighlights>
  </Layout>
);

export default HomePage;
