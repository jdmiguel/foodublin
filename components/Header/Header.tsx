import React from 'react';
import styled from 'styled-components';

import Logo from '../core/Logo/Logo';
import Finder from '../Finder/Finder';
import CustomLink, { CustomLinkSize } from '../core/CustomLink/CustomLink';

import { CDN_URL_STATIC_DIRECTORY } from '../../helpers/utils';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended: boolean;
};

const StyledHeader = styled.header<{ isExtended: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  ${({ isExtended, theme }) =>
    !isExtended &&
    `border-bottom: 1px solid ${theme.palette.LIGHT_SOFT}; background-color: ${theme.palette.SECONDARY};`};
`;

// Extended Header styles

const StyledExtendedHeaderContent = styled.div<{ bgImg: string | undefined }>`
  background-size: cover;
  background-image: url(${(props) => props.bgImg && props.bgImg});
  background-color: ${(props) => props.theme.palette.DARK_SOFT};
  display: flex;
  width: 100%;
  height: 550px;
  margin: 0;
`;

const StyledOverlay = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.85) 40%
  );
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 768px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.8) 48%
    );
  }
  @media only screen and (min-width: 992px) {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.8) 52%
    );
  }
`;

const StyledExtendedHeaderLogo = styled(Logo)`
  width: 225px;
  margin: 15px 0 25px;
  @media only screen and (min-width: 768px) {
    width: 270px;
  }
  @media only screen and (min-width: 992px) {
    width: 300px;
    margin: 0 0 30px;
  }
`;

const StyledExtendedHeaderClaim = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  font-weight: 400;
  color: ${(props) => props.theme.palette.LIGHT_MAX};
  margin-bottom: 35px;
  @media only screen and (min-width: 350px) {
    font-size: 1.45rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 2rem;
  }
  @media only screen and (min-width: 992px) {
    font-size: 2.5rem;
  }
`;

// Header styles

const StyledHeaderContent = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

const StyledHeaderLogo = styled(Logo)`
  width: 190px;
  @media only screen and (min-width: 992px) {
    width: 220px;
  }
`;

const StyledHeaderClaim = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${(props) => props.theme.palette.LIGHT_MIN};
  display: none;
  @media only screen and (min-width: 768px) {
    display: block;
  }
  @media only screen and (min-width: 992px) {
    font-size: 1.5rem;
  }
`;

const StyledCustomLink = styled(CustomLink)`
  @media only screen and (max-width: 539px) {
    color: ${(props) => props.theme.palette.LIGHT_MAX};
    padding: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
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
  <StyledHeader data-testid="header" isExtended={isExtended}>
    {isExtended ? (
      <StyledExtendedHeaderContent bgImg={bgImgSrc}>
        <StyledOverlay>
          <StyledExtendedHeaderLogo
            logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/light_logo.svg`}
          />
          <StyledExtendedHeaderClaim>{claimTxt}</StyledExtendedHeaderClaim>
          <Finder />
        </StyledOverlay>
      </StyledExtendedHeaderContent>
    ) : (
      <StyledHeaderContent>
        <StyledHeaderLogo
          logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/primary_logo.svg`}
          isLink={true}
        />
        <StyledHeaderClaim>{claimTxt}</StyledHeaderClaim>
        <StyledCustomLink route="/" size={CustomLinkSize.BIG}>
          <i className="material-icons">bookmarks</i>
          <StyledCustomLinkText>FAVORITES</StyledCustomLinkText>
        </StyledCustomLink>
      </StyledHeaderContent>
    )}
  </StyledHeader>
);

export default Header;
