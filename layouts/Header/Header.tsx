import React from 'react';
import styled, { css } from 'styled-components';

import Logo from '../../components/core/Logo/Logo';
import Finder from '../../components/Finder/Finder';
import CustomLink, {
  CustomLinkSize,
} from '../../components/core/CustomLink/CustomLink';

import { CDN_URL_STATIC_DIRECTORY } from '../../helpers/utils';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended: boolean;
};

const StyledHeader = styled.header<{ bgImg: string | undefined }>`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  background-image: url(${({ bgImg }) => bgImg && bgImg});
  background-color: ${(props) => props.theme.palette.DARK_SOFT};
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

const StyledHeaderLogo = styled(Logo)<{ isExtended: boolean }>`
  width: ${({ isExtended }) => (isExtended ? '225px' : '190px')};
  margin: ${({ isExtended }) => isExtended && '15px 0 25px'};
  @media only screen and (min-width: 768px) {
    width: ${({ isExtended }) => isExtended && '270px'};
  }
  @media only screen and (min-width: 992px) {
    width: ${({ isExtended }) => (isExtended ? '300px' : '200px')};
    margin: ${({ isExtended }) => isExtended && '0 0 30px'};
  }
`;

const StyledHeaderClaim = styled.h2<{ isExtended: boolean }>`
  font-size: ${({ isExtended }) => (isExtended ? '1.25rem' : '1.3rem')};
  text-align: center;
  font-weight: 400;
  color: ${(props) => props.theme.palette.DARK_SOFT};
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
  <StyledHeader data-testid="header" bgImg={bgImgSrc}>
    <StyledOverlay isExtended={isExtended}>
      <StyledHeaderContent isExtended={isExtended}>
        <StyledHeaderLogo
          isExtended={isExtended}
          logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/logo.svg`}
        />
        <StyledHeaderClaim isExtended={isExtended}>
          {claimTxt}
        </StyledHeaderClaim>
        {isExtended && <Finder />}
        {!isExtended && (
          <StyledCustomLink route="/" size={CustomLinkSize.BIG}>
            <i className="material-icons">bookmarks</i>
            <StyledCustomLinkText>FAVORITES</StyledCustomLinkText>
          </StyledCustomLink>
        )}
      </StyledHeaderContent>
    </StyledOverlay>
  </StyledHeader>
);

export default Header;
