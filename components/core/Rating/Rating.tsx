import React from 'react';
import styled from 'styled-components';

import { DEFAULT_RATING_STAR_LIST } from '../../../helpers/staticData';

type RatingStar = {
  id: number;
  type: string;
};

type RatingProps = {
  value: number;
  votes: number;
};

const StyledRankStarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledRankStar = styled.i`
  font-size: 1.5rem;
  color: ${(props) => props.theme.palette.DARK_MEDIUM};
`;

const StyledText = styled.p`
  color: ${(props) => props.theme.palette.DARK_MIN};
  margin-left: 10px;
`;

const Rating: React.FC<RatingProps> = ({ value, votes }) => {
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
      <StyledText>{`(${votes} votes)`}</StyledText>
    </StyledRankStarsWrapper>
  );
};
export default Rating;
