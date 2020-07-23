import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type LogoProps = {
  className?: string;
  logoSrc: string;
  isLink?: boolean;
};

const StyledLink = styled.a`
  margin-bottom: 5px;
  @media only screen and (min-width: 540px) {
    margin-bottom: 7px;
  }
`;

const StyledImg = styled.img`
  max-width: 300px;
`;

const getLogoContent = (className: string | undefined, logoSrc: string) => (
  <h1 className={className} data-testid="logo">
    <StyledImg src={logoSrc} alt="FooDublin Logo" />
  </h1>
);

const Logo: React.FC<LogoProps> = ({ className, logoSrc, isLink = false }) => (
  <>
    {isLink ? (
      <Link href="/" passHref>
        <StyledLink>{getLogoContent(className, logoSrc)}</StyledLink>
      </Link>
    ) : (
      getLogoContent(className, logoSrc)
    )}
  </>
);

export default Logo;
