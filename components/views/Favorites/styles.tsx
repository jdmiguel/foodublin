import styled from 'styled-components';

export const StyledFavoritesPage = styled.div`
  max-width: 1200px;
  margin: 50px auto;
`;

export const StyledTitleLoading = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  @media only screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const StyledCardsWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  gap: 24px;
  @media only screen and (min-width: 768px) {
    margin-top: 35px;
    grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));
  }
`;
