import React from 'react';
import styled from 'styled-components';

import { DEFAULT_RATING_STAR_LIST } from '../../../helpers/staticData';

type RatingStar = {
  id: number;
  type: string;
};

type RatingProps = {
  className?: string;
  value: number;
};

const StyledRankStarsWrapper = styled.div`
  display: flex;
`;

const StyledRankStar = styled.i`
  font-size: 2.2rem;
  color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  @media only screen and (min-width: 640px) {
    font-size: 2.7rem;
  }
`;

const Rating: React.FC<RatingProps> = ({ value }) => {
  const roundedValue = Math.round(value);
  const ratingStartList: RatingStar[] = DEFAULT_RATING_STAR_LIST.map((star) => {
    const starType = roundedValue >= star.id ? 'star' : star.type;
    return { ...star, type: starType };
  });

  return (
    <StyledRankStarsWrapper>
      {ratingStartList.map((star) => (
        <StyledRankStar key={star.id} className="material-icons">
          {star.type}
        </StyledRankStar>
      ))}
    </StyledRankStarsWrapper>
  );
};
export default Rating;
