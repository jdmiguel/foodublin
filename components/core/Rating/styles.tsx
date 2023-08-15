import styled from 'styled-components';

export const StyledRankStarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledRankStar = styled.i`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
`;

export const StyledText = styled.p`
  color: ${({ theme }) => theme.palette.DARK_MIN};
  margin-left: 10px;
`;
