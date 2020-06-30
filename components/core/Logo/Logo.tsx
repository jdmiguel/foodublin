import React from 'react';
import styled from 'styled-components';

type LogoProps = {
  className?: string;
  logoSrc: string;
  logoAltTxt: string;
};

const StyledImg = styled.img`
  max-width: 300px;
`;

const Logo: React.FC<LogoProps> = ({ className, logoSrc, logoAltTxt }) => (
  <h1 className={className} data-testid="logo">
    <StyledImg src={logoSrc} alt={logoAltTxt} />
  </h1>
);

export default Logo;
