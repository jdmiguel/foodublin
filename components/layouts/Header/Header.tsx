import React from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { Logo }, { LogoSize } from '../../core/Logo/Logo';
import { CustomLink }, { CustomLinkSize } from '../../core/CustomLink/CustomLink';

import Finder from '../../ui/Finder/Finder';

import { CDN_URL_STATIC_DIRECTORY } from '../../../helpers/utils';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended: boolean;
};

const StyledHeader = styled.header<{ bgImg: string | undefined }>`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  background-image: url(${({ bgImg }) => bgImg && bgImg});
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  background-size: cover;
  background-position: center;
  display: flex;
`;

const StyledOverlay = styled.div<{ isExtended: boolean }>`
  width: 100%;
  height: ${({ isExtended }) => (isExtended ? '550px' : '80px')};
  background: rgba(0, 0, 0, 0.8);
`;

const headerContentCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const basicHeaderContentCSS = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1140px;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

const StyledHeaderContent = styled.div<{ isExtended: boolean }>`
  width: 100%;
  height: 100%;
  ${({ isExtended }) =>
    isExtended ? headerContentCSS : basicHeaderContentCSS};
  margin: ${({ isExtended }) => (isExtended ? '15px 0 25px' : '0 auto')};
`;

const StyledHeaderClaim = styled.h2<{ isExtended: boolean }>`
  font-size: ${({ isExtended }) => (isExtended ? '1.25rem' : '1.3rem')};
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  margin-bottom: ${({ isExtended }) => isExtended && '35px'};
  display: ${({ isExtended }) => !isExtended && 'none'};
  @media only screen and (min-width: 350px) {
    font-size: ${({ isExtended }) => isExtended && '1.45rem'};
  }
  @media only screen and (min-width: 768px) {
    display: ${({ isExtended }) => !isExtended && 'block'};
    font-size: ${({ isExtended }) => isExtended && '2rem'};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${({ isExtended }) => (isExtended ? '2.5rem' : '1.6rem')};
  }
`;

const StyledCustomLink = styled(CustomLink)`
  @media only screen and (max-width: 539px) {
    color: ${({ theme }) => theme.palette.LIGHT_MAX};
    padding: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
    i {
      margin-right: 0;
    }
  }
`;

const StyledCustomLinkText = styled.span`
  display: none;
  @media only screen and (min-width: 540px) {
    display: block;
  }
`;

const Header: React.FC<HeaderProps> = ({ bgImgSrc, claimTxt, isExtended }) => (
  <StyledHeader data-testid="header" bgImg={bgImgSrc}>
    <StyledOverlay isExtended={isExtended}>
      <StyledHeaderContent isExtended={isExtended}>
        <Link href="/">
          <a>
            <Logo
              size={isExtended ? LogoSize.BIG : LogoSize.SMALL}
              logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/logo.svg`}
            />
          </a>
        </Link>
        <StyledHeaderClaim isExtended={isExtended}>
          {claimTxt}
        </StyledHeaderClaim>
        {isExtended && <Finder />}
        {!isExtended && (
          <Link href="/favorites">
            <StyledCustomLink size={CustomLinkSize.BIG}>
              <i className="material-icons">bookmarks</i>
              <StyledCustomLinkText>FAVORITES</StyledCustomLinkText>
            </StyledCustomLink>
          </Link>
        )}
      </StyledHeaderContent>
    </StyledOverlay>
  </StyledHeader>
);

export default Header;
