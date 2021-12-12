import styled from 'styled-components';
import { LogoSize } from '../types';

export const StyledLogo = styled.h1<{ size: LogoSize.BIG | LogoSize.SMALL }>`
  width: ${({ size }) => (size === LogoSize.BIG ? '225px' : '190px')};
  margin: ${({ size }) => size === LogoSize.BIG && '15px 0 25px'};
  @media only screen and (min-width: 768px) {
    width: ${({ size }) => size === LogoSize.BIG && '270px'};
  }
  @media only screen and (min-width: 992px) {
    width: ${({ size }) => (size === LogoSize.BIG ? '300px' : '200px')};
    margin: ${({ size }) => size === LogoSize.BIG && '0 0 30px'};
  }
`;

export const StyledImg = styled.img`
  max-width: 300px;
`;
