import React from 'react';
import Link from 'next/link';

import { Logo } from '../../core/Logo/Logo';

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
};

export const Header: React.FC<HeaderProps> = ({
  bgImgSrc,
  claimTxt,
  isExtended,
}) => (
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
