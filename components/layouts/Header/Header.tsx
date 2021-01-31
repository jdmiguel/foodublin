import React from 'react';
import Image from 'next/image';

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
  isExtended?: boolean;
  onNavigationFromFinder: (route: string, asRoute: string) => void;
  onClickLogo: () => void;
  onClickFavorites: () => void;
};

const srcImageLoader = () => '/images/food-loader.jpg';

export const Header: React.FC<HeaderProps> = ({
  claimTxt,
  isExtended = false,
  onClickLogo,
  onClickFavorites,
  onNavigationFromFinder,
}) => (
  <StyledHeader data-testid="header" isExtended={isExtended}>
    <Image
      layout="fill"
      src="/images/food.jpg"
      alt="food"
      className="headerBg"
      priority={true}
      loader={srcImageLoader}
    />
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
