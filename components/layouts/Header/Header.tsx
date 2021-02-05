import React from 'react';

import { Logo } from '../../core/Logo/Logo';

import {
  StyledHeader,
  StyledOverlay,
  StyledHeaderContent,
  StyledLogoLink,
  StyledHeaderClaim,
  StyledFinder,
  StyledFavoriteLink,
  StyledFavoriteLinkText,
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
        <StyledLogoLink
          isExtended={isExtended}
          onClick={onClickLogo}
          animationDuration={0.25}
          animationDelay={0.15}
        >
          <Logo
            size={isExtended ? LogoSize.BIG : LogoSize.SMALL}
            logoSrc={'/images/logo.svg'}
          />
        </StyledLogoLink>
        <StyledHeaderClaim
          isExtended={isExtended}
          animationDuration={0.35}
          animationDelay={0.25}
        >
          {claimTxt}
        </StyledHeaderClaim>
        {isExtended && (
          <StyledFinder
            onNavigation={onNavigationFromFinder}
            animationDuration={0.45}
            animationDelay={0.55}
          />
        )}
        {!isExtended && (
          <StyledFavoriteLink
            size={CustomLinkSize.BIG}
            onClick={onClickFavorites}
          >
            <i className="material-icons">bookmarks</i>
            <StyledFavoriteLinkText>FAVORITES</StyledFavoriteLinkText>
          </StyledFavoriteLink>
        )}
      </StyledHeaderContent>
    </StyledOverlay>
  </StyledHeader>
);
