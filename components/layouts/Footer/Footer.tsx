import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { Breadcrumbs } from '../../core/Breadcrumbs/Breadcrumbs';

import {
  StyledFooterWrapper,
  StyledFooterVeil,
  StyledNavFooterWrapper,
  StyledNavFooter,
  StyledCustomLink,
  StyledRightsFooter,
  StyledBlock,
  StyledText,
} from './styles';

import { InitialAppState } from '../../../helpers/types';

type FooterProps = {
  showVeil?: boolean;
  isExtended?: boolean;
  onClickBreadcrumb: (route: string, asRoute: string) => void;
};

export const Footer: React.FC<FooterProps> = ({
  showVeil = false,
  isExtended = false,
  onClickBreadcrumb,
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
            <Link href="/favorites">
              <StyledCustomLink>
                <i className="material-icons">bookmarks</i>FAVORITES
              </StyledCustomLink>
            </Link>
          </StyledNavFooter>
        </StyledNavFooterWrapper>
      )}
      <StyledRightsFooter>
        <StyledBlock>
          <StyledCustomLink route="https://github.com/jdmiguel/foodublin">
            GITHUB
          </StyledCustomLink>
        </StyledBlock>
        <StyledBlock>
          <StyledText addSeparation={false}>FOODUBLIN ©2020</StyledText>
        </StyledBlock>
        <StyledBlock>
          <StyledText addSeparation={true}>BY</StyledText>
          <StyledCustomLink route="https://jdmiguel.netlify.app/">
            JDMIGUEL
          </StyledCustomLink>
        </StyledBlock>
      </StyledRightsFooter>
    </StyledFooterWrapper>
  );
};
