import styled from 'styled-components';

export const StyledInputWrapper = styled.div`
  width: 100%;
  border-radius: 4px;
  padding: 0 20px;
  background: ${({ theme }) => theme.palette.LIGHT_MAX};
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.DARK_SOFT};
    margin-right: 10px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 550px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 55px;
  padding: 10px 0;
  line-height: 20px;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  background: transparent;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
`;
