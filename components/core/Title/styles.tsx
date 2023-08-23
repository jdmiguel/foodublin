import styled from 'styled-components';

export const StyledTitle = styled.h3`
  font-size: 1.6rem;
  line-height: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  margin-bottom: 30px;
  @media only screen and (min-width: 768px) {
    font-size: 2rem;
    line-height: 32px;
  }
`;
