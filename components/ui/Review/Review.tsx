import { Rating } from '../../core/Rating/Rating';
import {
  StyledReview,
  StyledReviewBlock,
  StyledReviewUserImage,
  StyledGenericThumb,
  StyledReviewUserName,
  StyledReviewDate,
  StyledReviewText,
} from './styles';
import { Review as ReviewType } from '@/components/pages/types';
import { THUMB_GENERIC_SRC, USER_GENERIC_SRC } from '@/store/statics';

type ReviewProps = {
  data: ReviewType;
};

export const getFormattedDate = (strDate: string) => {
  const inputDate = new Date(strDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  return inputDate.toLocaleDateString('en-US', options);
};

export const Review: React.FC<ReviewProps> = ({ data: { text, rating, time_created, user } }) => (
  <StyledReview>
    <StyledReviewBlock>
      <StyledReviewUserImage
        src={user.image_url || USER_GENERIC_SRC}
        alt={user.name}
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
      <StyledReviewUserName>{user.name}</StyledReviewUserName>
    </StyledReviewBlock>
    <StyledReviewBlock>
      <Rating value={rating} />
      <StyledReviewDate>{getFormattedDate(time_created)}</StyledReviewDate>
    </StyledReviewBlock>
    <StyledReviewText>{text}</StyledReviewText>
  </StyledReview>
);
