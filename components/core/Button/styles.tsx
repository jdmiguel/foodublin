import styled from 'styled-components';

export const StyledButtonWrapper = styled.div<{
  fullWidth: boolean;
  isFloating: boolean;
}>`
  width: ${({ fullWidth, isFloating }) => (fullWidth ? '100%' : isFloating ? '50px' : '200px')};
  height: 55px;
`;

export const StyledButton = styled.button<{
  fullWidth: boolean;
  isFloating: boolean;
}>`
  width: ${({ fullWidth, isFloating }) => (fullWidth ? '100%' : isFloating ? '50px' : '200px')};
  height: ${({ isFloating }) => (isFloating ? '50px' : '100%')};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: ${({ isFloating }) => !isFloating && '0 15px'};
  border-radius: ${({ isFloating }) => (isFloating ? '50%' : '4px')};
  box-shadow: ${({ isFloating }) =>
    isFloating &&
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'};
  cursor: pointer;
  outline: none;
  background-color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
  color: ${({ theme }) => theme.palette.LIGHT_MAX};
  font-weight: 600;
  transition: background-color 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    margin-right: ${({ isFloating }) => !isFloating && '6px'};
    font-size: 1.3em;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY};
  }
  &:focus {
    background-color: ${({ theme }) => theme.palette.PRIMARY};
  }
`;
