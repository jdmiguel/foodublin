import React from 'react';

import { Rating } from '../../core/Rating/Rating';

import {
  StyledReviewCard,
  StyledReviewBlock,
  StyledReviewUserImage,
  StyledGenericThumb,
  StyledReviewUserName,
  StyledReviewDate,
  StyledReviewText,
} from './styles';

import { THUMB_GENERIC_SRC } from '@/store/statics';

type ReviewCardProps = {
  userImgSrc: string;
  userName: string;
  rating: number;
  date: string;
  text: string;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  userImgSrc,
  userName,
  rating,
  date,
  text,
}) => (
  <StyledReviewCard>
    <StyledReviewBlock>
      <StyledReviewUserImage
        src={userImgSrc}
        alt={userName}
        placeholder={({ imageProps, ref }) => (
          <div ref={ref} className="LazyImage-Placeholder">
            <StyledGenericThumb src={THUMB_GENERIC_SRC} alt={imageProps.alt} />
          </div>
        )}
        actual={({ imageProps }) => (
          <div className="LazyImage-Actual">
            <img {...imageProps} alt="user" />
          </div>
        )}
      />
      <StyledReviewUserName>{userName}</StyledReviewUserName>
    </StyledReviewBlock>
    <StyledReviewBlock>
      <Rating value={rating} />
      <StyledReviewDate>{date}</StyledReviewDate>
    </StyledReviewBlock>
    <StyledReviewText>{text}</StyledReviewText>
  </StyledReviewCard>
);
