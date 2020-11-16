import React, { useState, useEffect } from 'react';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { Layout } from '../../layouts/Layout/Layout';

import {
  StyledFavoritesPage,
  StyledTitleLoading,
  StyledCardsWrapper,
} from './styles';

import {
  THUMB_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../../store/statics';

import { getTitleText } from '../../../helpers/utils';

import { Restaurant } from '../types';

type FavoritesPageProps = {
  total: number;
  restaurants: Restaurant[];
  clickRestaurant: (route: string, asRoute: string) => void;
};

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  total,
  restaurants,
  clickRestaurant,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const { totalText, restaurantText } = getTitleText(total);

  useEffect(() => {
    setIsloading(false);
  }, []);

  return (
    <Layout isExtendedFooter={true}>
      <StyledFavoritesPage className="grid-container">
        {isLoading ? (
          <StyledTitleLoading>{DEFAULT_TEXT_LOADING}</StyledTitleLoading>
        ) : (
          <Title
            text={`${totalText} ${restaurantText} saved in your favorites`}
          />
        )}
        <StyledCardsWrapper className="grid-x grid-margin-x grid-margin-y">
          {restaurants.map((restaurant) => (
            <div
              className="cell small-12 medium-6 large-4"
              key={`${restaurant.id}-${restaurant.title}`}
            >
              <Card
                imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
                title={restaurant.title}
                content={restaurant.content}
                onClick={() =>
                  clickRestaurant(restaurant.route, restaurant.asRoute)
                }
              />
            </div>
          ))}
        </StyledCardsWrapper>
      </StyledFavoritesPage>
    </Layout>
  );
};

export default FavoritesPage;
