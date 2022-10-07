import styled from 'styled-components';

export const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media only screen and (min-width: 540px) {
    display: flex;
    gap: 10px;
    button {
      flex: 1;
    }
  }
`;
