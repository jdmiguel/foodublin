import styled from 'styled-components';

export const StyledHighlights = styled.div`
  margin: 50px auto 60px;
  max-width: 1200px;
  @media only screen and (min-width: 1024px) {
    margin: 75px auto 60px;
  }
`;

export const StyledHighlightWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  gap: 30px;
`;
