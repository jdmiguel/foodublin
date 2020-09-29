import React from 'react';
import styled from 'styled-components';

export enum LogoSize {
  BIG = 'big',
  SMALL = 'small',
}

type LogoProps = {
  size: LogoSize.BIG | LogoSize.SMALL;
  logoSrc: string;
};

const StyledLogo = styled.h1<{ size: LogoSize.BIG | LogoSize.SMALL }>`
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

const StyledImg = styled.img`
  max-width: 300px;
`;

export const Logo: React.FC<LogoProps> = ({ size, logoSrc }) => (
  <StyledLogo data-testid="logo" size={size}>
    <StyledImg src={logoSrc} alt="FooDublin Logo" />
  </StyledLogo>
);
