import React from 'react';

import { CustomLink } from '../../core/CustomLink/CustomLink';

import { StyledHeaderBarWrapper, StyledHeaderBar } from './styles';

type HeaderBarProps = {
  onClickBack: () => void;
  onClickFavorites: () => void;
};

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onClickBack,
  onClickFavorites,
}) => (
  <StyledHeaderBarWrapper>
    <StyledHeaderBar className="grid-container">
      <CustomLink onClick={onClickBack}>{'< BACK'}</CustomLink>
      <CustomLink onClick={onClickFavorites}>
        <i className="material-icons">bookmarks</i>FAVORITES
      </CustomLink>
    </StyledHeaderBar>
  </StyledHeaderBarWrapper>
);
