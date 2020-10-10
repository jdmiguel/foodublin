import React from 'react';

import { Layout } from '../../layouts/Layout/Layout';

import { FullLoader } from '../../ui/FullLoader/FullLoader';

import { Loader } from '../../core/Loader/Loader';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { StyledHighlights, StyledHighlightWrapper } from './styles';

import { DEFAULT_TEXT_LOADING } from '../../../helpers/staticData';
import { Restaurant, CardType } from '../../../helpers/types';

type HighlightRestaurant = Restaurant & { featuredSrc: string };

type HomePageProps = {
  isLoading: boolean;
  highlights: HighlightRestaurant[];
  clickHighlight: (id: string, route: string, asRoute: string) => void;
};

export const HomePage: React.FC<HomePageProps> = ({
  highlights,
  isLoading,
  clickHighlight,
}) => {
  return isLoading ? (
    <FullLoader>
      <Loader text={DEFAULT_TEXT_LOADING} />
    </FullLoader>
  ) : (
    <Layout isExtendedHeader={true} isExtendedFooter={true}>
      <FullLoader isShowed={isLoading}>
        <Loader text={DEFAULT_TEXT_LOADING} />
      </FullLoader>
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
};
