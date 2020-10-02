import React from 'react';

import { StyledCuisinesWrapper, StyledCuisine } from './styles';

type CuisinesProps = {
  cuisines: string[];
};

export const Cuisines = ({ cuisines }: CuisinesProps) => (
  <StyledCuisinesWrapper>
    {cuisines.map((cuisine) => (
      <StyledCuisine key={cuisine}>{cuisine}</StyledCuisine>
    ))}
  </StyledCuisinesWrapper>
);
