import React from 'react';

import Card from '../core/Card/Card';

import { RestaurantType } from '../../helpers/types';

import { THUMB_GENERIC_SRC } from '../../helpers/staticData';

type RelatedRestaurantsProps = {
  restaurants: RestaurantType[];
};

const RelatedRestaurants = ({ restaurants }: RelatedRestaurantsProps) => (
  <>
    {restaurants.map((restaurant) => (
      <div
        className="cell small-12 medium-6 large-4"
        key={`${restaurant.id}-${restaurant.title}`}
      >
        <Card
          key={restaurant.id}
          imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
          title={restaurant.title}
          route="/detail/[name]"
          asRoute={`/detail/${restaurant.link}`}
          firstText={restaurant.firstText}
        />
      </div>
    ))}
  </>
);

export default RelatedRestaurants;
