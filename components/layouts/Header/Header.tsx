import React from 'react';

import { Logo } from '../../core/Logo/Logo';
import { CustomLink } from '../../core/CustomLink/CustomLink';

import { Finder } from '../../ui/Finder/Finder';

import {
  StyledHeader,
  StyledOverlay,
  StyledHeaderContent,
  StyledHeaderClaim,
  StyledCustomLink,
  StyledCustomLinkText,
} from './styles';

import { CustomLinkSize, LogoSize } from '../../core/types';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended?: boolean;
  onNavigationFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickFavorites: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended = false,
  onClickLogo,
  onClickFavorites,
  onNavigationFromFinder,
}) => (
  <StyledHeader data-testid="header" bgImg={bgImgSrc} isExtended={isExtended}>
    <StyledOverlay isExtended={isExtended}>
      <StyledHeaderContent isExtended={isExtended}>
        <CustomLink onClick={onClickLogo}>
          <Logo
            size={isExtended ? LogoSize.BIG : LogoSize.SMALL}
            logoSrc={'/images/logo.svg'}
          />
        </CustomLink>
        <StyledHeaderClaim isExtended={isExtended}>
          {claimTxt}
        </StyledHeaderClaim>
        {isExtended && <Finder onNavigation={onNavigationFromFinder} />}
        {!isExtended && (
          <StyledCustomLink
            size={CustomLinkSize.BIG}
            onClick={onClickFavorites}
          >
            <i className="material-icons">bookmarks</i>
            <StyledCustomLinkText>FAVORITES</StyledCustomLinkText>
          </StyledCustomLink>
        )}
      </StyledHeaderContent>
    </StyledOverlay>
  </StyledHeader>
);
