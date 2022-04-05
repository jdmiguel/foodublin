import { Card } from '../../core/Card/Card';
import { Restaurant } from '../types';
import { THUMB_GENERIC_SRC } from '@/store/statics';
import { StyledRelatedRestaurants } from './styles';

type RelatedRestaurantsProps = {
  restaurants: Restaurant[];
  onClickRelatedRestaurant: (route: string, asRoute: string) => void;
};

export const RelatedRestaurants = ({
  restaurants,
  onClickRelatedRestaurant,
}: RelatedRestaurantsProps) => (
  <StyledRelatedRestaurants>
    {restaurants.map((restaurant) => (
      <Card
        key={restaurant.title}
        imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
        title={restaurant.title}
        content={restaurant.content}
        onClick={() => onClickRelatedRestaurant(restaurant.route, restaurant.asRoute)}
      />
    ))}
  </StyledRelatedRestaurants>
);
