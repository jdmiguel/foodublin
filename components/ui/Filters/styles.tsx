import styled from 'styled-components';

export const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
