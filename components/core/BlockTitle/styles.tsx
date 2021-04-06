import styled from 'styled-components';

export const StyledBlockTitle = styled.h4`
  color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  font-size: 1.35rem;
  font-weight: 500;

  @media only screen and (min-width: 992px) {
    font-size: 1.45rem;
  }
`;
