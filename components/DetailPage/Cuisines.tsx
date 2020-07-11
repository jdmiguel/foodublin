import React from 'react';
import styled from 'styled-components';

type CuisinesProps = {
  cuisines: string;
};

const StyledCuisinesWrapper = styled.div`
  margin-top: 20px;
`;

const StyledCuisine = styled.span`
  background-color: ${(props) => props.theme.palette.DARK_MIN};
  color: ${(props) => props.theme.palette.LIGHT_MAX};
  font-weight: 500;
  border-radius: 15px;
  padding: 5px 10px;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;

const Cuisines = ({ cuisines }: CuisinesProps) => (
  <StyledCuisinesWrapper>
    {cuisines.split(',').map((cuisine) => (
      <StyledCuisine key={cuisine}>{cuisine}</StyledCuisine>
    ))}
  </StyledCuisinesWrapper>
);

export default Cuisines;
