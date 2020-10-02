import styled from 'styled-components';

export const StyledHighlights = styled.div`
  margin-top: 50px;
  margin-bottom: 60px;
  @media only screen and (min-width: 1024px) {
    margin-top: 75px;
    padding: 0 30px;
  }
`;

export const StyledHighlightWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;
