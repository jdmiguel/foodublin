import styled from 'styled-components';

export const StyledFilters = styled.div`
  display: flex;

  button {
    flex: 1;
    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;
