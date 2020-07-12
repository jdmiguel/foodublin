import React from 'react';

import Card from '../core/Card/Card';

import { CardProps } from '../../helpers/types';

type RelatedRestaurantsProps = {
  restaurants: CardProps[];
};

const RelatedRestaurants = ({ restaurants }: RelatedRestaurantsProps) => (
  <>
    {restaurants.map((restaurant) => (
      <Card
        className="cell small-12 medium-6 large-4"
        key={restaurant.id}
        imgSrc={restaurant.imgSrc}
        imgAlt={restaurant.imgAlt}
        link={restaurant.link}
        title={restaurant.title}
        firstText={restaurant.firstText}
        secondText={restaurant.secondText}
      />
    ))}
  </>
);

export default RelatedRestaurants;
