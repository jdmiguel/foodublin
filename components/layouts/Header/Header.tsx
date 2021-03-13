import React from 'react';

import { Logo } from '../../core/Logo/Logo';
import { LogoSize } from '../../core/types';

import { HeaderBar } from './HeaderBar';

import {
  StyledHeaderWrapper,
  StyledHeader,
  StyledOverlay,
  StyledHeaderContent,
  StyledLogoLink,
  StyledHeaderClaim,
  StyledFinder,
} from './styles';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended?: boolean;
  onNavigationFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickFavorites: () => void;
  onClickBack: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended = false,
  onClickLogo,
  onNavigationFromFinder,
  onClickBack,
  onClickFavorites,
}) => {
  return (
    <StyledHeaderWrapper data-testid="header" isExtended={isExtended}>
      <StyledHeader bgImg={bgImgSrc}>
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
          </StyledHeaderContent>
        </StyledOverlay>
      </StyledHeader>
      {!isExtended && (
        <HeaderBar
          onClickBack={onClickBack}
          onClickFavorites={onClickFavorites}
        />
      )}
    </StyledHeaderWrapper>
  );
};
