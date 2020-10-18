import React from 'react';
import { Title } from '../../core/Title/Title';
import { Card } from '../../core/Card/Card';

import { StyledFavoritesPage, StyledCardsWrapper } from './styles';

import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';
import { Restaurant } from '../../../helpers/types';
import { getTitleText } from '../../../helpers/utils';

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
  const { totalText, restaurantText } = getTitleText(total);

  return (
    <StyledFavoritesPage className="grid-container">
      <Title text={`${totalText} ${restaurantText} saved in your favorites`} />
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
  );
};

export default FavoritesPage;
