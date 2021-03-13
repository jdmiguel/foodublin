import React from 'react';
import { useSelector } from 'react-redux';

import { Breadcrumbs } from '../../core/Breadcrumbs/Breadcrumbs';
import { CustomLink } from '../../core/CustomLink/CustomLink';

import { StyledFooterBarWrapper, StyledFooterBar } from './styles';

import { InitialAppState } from '@/store/redux/types';

type FooterBarProps = {
  onClickBreadcrumb: (route: string, asRoute: string) => void;
  onClickFavorites: () => void;
};

export const FooterBar: React.FC<FooterBarProps> = ({
  onClickBreadcrumb,
  onClickFavorites,
}) => {
  const { breadcrumbs } = useSelector((state: InitialAppState) => state);

  return (
    <StyledFooterBarWrapper>
      <StyledFooterBar className="grid-container">
        <Breadcrumbs
          breadcrumbsData={breadcrumbs || []}
          onClickBreadcrumb={onClickBreadcrumb}
        />
        <CustomLink onClick={onClickFavorites}>
          <i className="material-icons">bookmarks</i>FAVORITES
        </CustomLink>
      </StyledFooterBar>
    </StyledFooterBarWrapper>
  );
};
