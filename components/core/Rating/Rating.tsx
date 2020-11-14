import React from 'react';

import { StyledRankStarsWrapper, StyledRankStar, StyledText } from './styles';

import { DEFAULT_RATING_STAR_LIST } from '../../../store/statics';

type RatingStar = {
  id: number;
  type: string;
};

type RatingProps = {
  value: number;
  votes?: number;
};

export const Rating: React.FC<RatingProps> = ({ value, votes }) => {
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
      {votes && <StyledText>{`(${votes} votes)`}</StyledText>}
    </StyledRankStarsWrapper>
  );
};
