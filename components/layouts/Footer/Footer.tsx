import React from 'react';

import { CustomLink } from '../../core/CustomLink/CustomLink';

import { FooterBar } from './FooterBar';

import {
  StyledFooterWrapper,
  StyledFooterVeil,
  StyledRightsFooter,
  StyledBlock,
  StyledText,
} from './styles';

type FooterProps = {
  showVeil?: boolean;
  isExtended?: boolean;
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  showVeil = false,
  isExtended = false,
  onClickBreadcrumb,
  onClickFavorites,
}) => (
  <StyledFooterWrapper>
    {showVeil && <StyledFooterVeil endValue={0.6} />}
    {isExtended && (
      <FooterBar
        onClickBreadcrumb={onClickBreadcrumb}
        onClickFavorites={onClickFavorites}
      />
    )}
    <StyledRightsFooter>
      <StyledBlock>
        <CustomLink route="https://github.com/jdmiguel/foodublin">
          GITHUB
        </CustomLink>
      </StyledBlock>
      <StyledBlock>
        <StyledText addSeparation={false}>FOODUBLIN ©2020</StyledText>
      </StyledBlock>
      <StyledBlock>
        <StyledText addSeparation={true}>BY</StyledText>
        <CustomLink route="https://jdmiguel.netlify.app/">JDMIGUEL</CustomLink>
      </StyledBlock>
    </StyledRightsFooter>
  </StyledFooterWrapper>
);
