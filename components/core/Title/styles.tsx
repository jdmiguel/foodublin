import styled from 'styled-components';

export const StyledTitle = styled.h3`
  font-size: 1.8rem;
  line-height: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  margin-bottom: 35px;
  @media only screen and (min-width: 768px) {
    font-size: 2.3rem;
    line-height: 32px;
  }
`;
