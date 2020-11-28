import styled from 'styled-components';

export const StyledFavoritesPage = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media only screen and (min-width: 428px) {
    margin-bottom: 35px;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 60px;
    padding: 0 30px;
  }
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
  display: flex;
  justify-content: center;
  position: initial;
  @media only screen and (min-width: 640px) {
    justify-content: space-between;
  }
  @media only screen and (min-width: 768px) {
    position: relative;
    justify-content: flex-start;
    margin-top: 35px;
  }
`;
