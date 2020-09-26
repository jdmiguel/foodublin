import React from 'react';

import Card from '../../core/Card/Card';

import { Restaurant } from '../../../helpers/types';

import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';

type RelatedRestaurantsProps = {
  restaurants: Restaurant[];
  onClickRelatedRestaurant: () => void;
};

const RelatedRestaurants = ({
  restaurants,
  onClickRelatedRestaurant,
}: RelatedRestaurantsProps) => (
  <>
    {restaurants.map((restaurant) => (
      <div className="cell small-12 medium-6 large-4" key={restaurant.title}>
        <Card
          id={restaurant.id}
          imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
          title={restaurant.title}
          content={restaurant.content}
          route={restaurant.route}
          asRoute={restaurant.asRoute}
          onClick={onClickRelatedRestaurant}
        />
      </div>
    ))}
  </>
);

export default RelatedRestaurants;
