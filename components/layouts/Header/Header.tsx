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

import { CDN_URL_STATIC_DIRECTORY } from '../../../helpers/utils';
import { CustomLinkSize, LogoSize } from '../../../helpers/types';

type HeaderProps = {
  claimTxt: string;
  bgImgSrc?: string | undefined;
  isExtended: boolean;
  onClickLogo: (route: string) => void;
  onClickFavorites: (route: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended,
  onClickLogo,
  onClickFavorites,
}) => (
  <StyledHeader data-testid="header" bgImg={bgImgSrc}>
    <StyledOverlay isExtended={isExtended}>
      <StyledHeaderContent isExtended={isExtended}>
        <CustomLink onClick={() => onClickLogo('/')}>
          <Logo
            size={isExtended ? LogoSize.BIG : LogoSize.SMALL}
            logoSrc={`${CDN_URL_STATIC_DIRECTORY}/images/logo.svg`}
          />
        </CustomLink>
        <StyledHeaderClaim isExtended={isExtended}>
          {claimTxt}
        </StyledHeaderClaim>
        {isExtended && <Finder />}
        {!isExtended && (
          <StyledCustomLink
            size={CustomLinkSize.BIG}
            onClick={() => onClickFavorites('/favorites')}
          >
            <i className="material-icons">bookmarks</i>
            <StyledCustomLinkText>FAVORITES</StyledCustomLinkText>
          </StyledCustomLink>
        )}
      </StyledHeaderContent>
    </StyledOverlay>
  </StyledHeader>
);
