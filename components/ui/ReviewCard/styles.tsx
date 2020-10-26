import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

const ReviewCardImageCSS = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
`;

export const StyledReviewCard = styled.div`
  margin-top: 20px;
  padding-bottom: 20px;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  }
`;

export const StyledReviewBlock = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const StyledReviewUserImage = styled(LazyImage)`
  ${ReviewCardImageCSS}
`;

export const StyledGenericThumb = styled.img`
  ${ReviewCardImageCSS}
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
