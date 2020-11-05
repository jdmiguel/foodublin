import React from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { StyledHighlights, StyledHighlightWrapper } from './styles';

import { HighlightRestaurant, CardType } from '../../../helpers/types';

type HomePageProps = {
  highlights: HighlightRestaurant[];
  clickHighlight: (id: number, route: string, asRoute: string) => void;
};

const HomePage: React.FC<HomePageProps> = ({ highlights, clickHighlight }) => (
  <Layout isExtendedHeader={true} isExtendedFooter={true}>
    <StyledHighlights className="grid-container">
      <Title text="Featured restaurants" />
      <StyledHighlightWrapper className="grid-x grid-margin-x grid-margin-y">
        {highlights.map((restaurant) => (
          <div key={restaurant.id} className="cell small-12 medium-6 large-4">
            <Card
              imgSrc={restaurant.featuredSrc}
              title={restaurant.title}
              content={restaurant.content}
              type={CardType.HIGHLIGHT}
              onClick={() =>
                clickHighlight(
                  restaurant.id,
                  restaurant.route,
                  restaurant.asRoute,
                )
              }
            />
          </div>
        ))}
      </StyledHighlightWrapper>
    </StyledHighlights>
  </Layout>
);

export default HomePage;
