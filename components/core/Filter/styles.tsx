import styled from 'styled-components';

export const StyledFilter = styled.button<{ isActive: boolean }>`
  padding: 15px 8px;
  font-size: 0.9rem;
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  border-radius: 4px;
  color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  transition: all 0.2s ease-out;
  background-color: ${({ theme, isActive }) =>
    `${isActive ? theme.palette.PRIMARY_LIGHT : theme.palette.LIGHT_MEDIUM}`};
  @media only screen and (min-width: 768px) {
    width: auto;
    margin: 0;
    padding: 15px;
    font-size: 1rem;
  }
  @media only screen and (min-width: 1200px) {
    &:hover {
      background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
      color: ${({ theme }) => theme.palette.PRIMARY};
    }
  }
`;

export const StyledFilterText = styled.span`
  text-transform: uppercase;
  font-weight: 500;
`;

export const StyledFilterIcon = styled.i`
  font-size: 1.1rem;
  margin-right: 8px;
`;
