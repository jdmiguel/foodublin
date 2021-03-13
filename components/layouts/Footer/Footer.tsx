import React from 'react';
import { useSelector } from 'react-redux';

import { Breadcrumbs } from '../../core/Breadcrumbs/Breadcrumbs';
import { CustomLink } from '../../core/CustomLink/CustomLink';

import {
  StyledFooterWrapper,
  StyledFooterVeil,
  StyledNavFooterWrapper,
  StyledNavFooter,
  StyledRightsFooter,
  StyledBlock,
  StyledText,
} from './styles';

import { InitialAppState } from '@/store/redux/types';

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
}) => {
  const { breadcrumbs } = useSelector((state: InitialAppState) => state);

  return (
    <StyledFooterWrapper>
      {showVeil && <StyledFooterVeil endValue={0.6} />}
      {isExtended && (
        <StyledNavFooterWrapper>
          <StyledNavFooter className="grid-container">
            <Breadcrumbs
              breadcrumbsData={breadcrumbs || []}
              onClickBreadcrumb={onClickBreadcrumb}
            />
            <CustomLink onClick={onClickFavorites}>
              <i className="material-icons">bookmarks</i>FAVORITES
            </CustomLink>
          </StyledNavFooter>
        </StyledNavFooterWrapper>
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
          <CustomLink route="https://jdmiguel.netlify.app/">
            JDMIGUEL
          </CustomLink>
        </StyledBlock>
      </StyledRightsFooter>
    </StyledFooterWrapper>
  );
};
