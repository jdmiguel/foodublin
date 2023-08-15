import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

const ReviewImageCSS = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  object-fit: cover;
`;

export const StyledReview = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MIN};
`;

export const StyledReviewBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const StyledReviewUserImage = styled(LazyImage)`
  ${ReviewImageCSS}
`;

export const StyledGenericThumb = styled.img`
  ${ReviewImageCSS}
`;

export const StyledReviewUserName = styled.p`
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  font-size: 1.1rem;
  font-weight: 500;
  margin-left: 12px;
`;

export const StyledReviewDate = styled.p`
  color: ${({ theme }) => theme.palette.DARK_MIN};
  font-size: 0.9rem;
  margin-left: 8px;
`;

export const StyledReviewText = styled.p`
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  line-height: 1.3rem;
`;
