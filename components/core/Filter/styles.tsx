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
  transition: all 0.2s ease-out;
  background-color: ${({ theme, isActive }) =>
    `${isActive ? theme.palette.PRIMARY_LIGHT : theme.palette.LIGHT_MEDIUM}`};
  @media only screen and (min-width: 768px) {
    width: auto;
    margin: 0;
    padding: 15px;
    font-size: 1rem;
  }
  @media only screen and (min-width: 992px) {
    padding: 20px;
  }
  @media only screen and (min-width: 1200px) {
    &:hover {
      background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
      color: ${({ theme }) => theme.palette.PRIMARY};
    }
  }
`;

export const StyledFilterPrimaryText = styled.span`
  text-transform: uppercase;
  font-weight: 600;
`;

export const StyledFilterSecondaryText = styled.span`
  display: none;
  @media only screen and (min-width: 920px) {
    display: block;
  }
`;

export const StyledFilterIcon = styled.i`
  font-size: 1.1rem;
  line-height: 18px;
  margin-left: 10px;
  display: block;
  @media only screen and (min-width: 920px) {
    display: none;
  }
`;
