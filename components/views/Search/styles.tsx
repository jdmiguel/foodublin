import styled from 'styled-components';

export const StyledSearchPage = styled.div`
  max-width: 1200px;
  margin: 50px auto;
`;

export const StyledCardsWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  gap: 24px;
  @media only screen and (min-width: 768px) {
    margin-top: 35px;
  }
`;
