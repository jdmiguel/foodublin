import React from 'react';
import Link from 'next/link';

import { Card } from '../../core/Card/Card';

import { Restaurant } from '../../../helpers/types';

import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';

type RelatedRestaurantsProps = {
  restaurants: Restaurant[];
  onClickRelatedRestaurant: () => void;
};

export const RelatedRestaurants = ({
  restaurants,
  onClickRelatedRestaurant,
}: RelatedRestaurantsProps) => (
  <>
    {restaurants.map((restaurant) => (
      <div className="cell small-12 medium-6 large-4" key={restaurant.title}>
        <Link href={restaurant.route} as={restaurant.asRoute}>
          <Card
            imgSrc={restaurant.imgSrc || THUMB_GENERIC_SRC}
            title={restaurant.title}
            content={restaurant.content}
            onClick={onClickRelatedRestaurant}
          />
        </Link>
      </div>
    ))}
  </>
);
