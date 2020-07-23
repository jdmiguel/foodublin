import React from 'react';
import styled from 'styled-components';

import Breadcrumbs from '../core/Breadcrumbs/Breadcrumbs';
import CustomLink from '../core/CustomLink/CustomLink';

type FooterProps = {
  isExtended: boolean;
};

const StyledFooterWrapper = styled.footer`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const StyledNavFooterWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
`;

const StyledNavFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  @media only screen and (min-width: 768px) {
    padding: 15px 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledCustomLink = styled(CustomLink)<{ breadcrumbsSteps: number }>`
  margin-top: 7px;
  align-self: ${({ breadcrumbsSteps }) => breadcrumbsSteps > 2 && 'flex-end'};
  @media only screen and (min-width: 428px) {
    align-self: ${({ breadcrumbsSteps }) => breadcrumbsSteps > 2 && 'initial'};
  }
  @media only screen and (min-width: 768px) {
    margin-top: 0;
  }
`;

const StyledRightsFooter = styled.div`
  background-color: ${(props) => props.theme.palette.SECONDARY};
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const StyledText = styled.p`
  color: ${(props) => props.theme.palette.LIGHT_SOFT};
  font-weight: 300;
  font-size: 0.9em;
  &:not(:first-of-type) {
    margin-left: 5px;
    @media only screen and (min-width: 375px) {
      margin-left: 7px;
    }
  }
  &:not(:last-of-type) {
    &:after {
      content: ' | ';
      margin-left: 3px;
      @media only screen and (min-width: 375px) {
        margin-left: 5px;
      }
    }
  }
  &:last-of-type {
    margin-right: 1px;
    @media only screen and (min-width: 375px) {
      margin-right: 3px;
    }
  }
  @media only screen and (min-width: 375px) {
    font-size: 1em;
  }
`;

const breadrumbsData = [
  { text: 'Home', route: '/' },
  {
    text: 'Search Restaurants',
    route: '/search/rathmines/fast-food',
  },
  { text: 'Restaurant Details', route: '/detail/elefant-castle' },
];

const Footer: React.FC<FooterProps> = ({ isExtended }) => (
  <StyledFooterWrapper>
    {isExtended && (
      <StyledNavFooterWrapper>
        <StyledNavFooter className="grid-container">
          <Breadcrumbs breadcrumbsData={breadrumbsData} />
          <StyledCustomLink breadcrumbsSteps={breadrumbsData.length} route="/">
            <i className="material-icons">bookmarks</i>FAVOURITES
          </StyledCustomLink>
        </StyledNavFooter>
      </StyledNavFooterWrapper>
    )}
    <StyledRightsFooter>
      <StyledText>FOODUBLIN</StyledText>
      <StyledText>COPYRIGHT ©2020</StyledText>
      <StyledText>BY</StyledText>
      <CustomLink route="https://jdmiguel.netlify.app/" isExternal={true}>
        JDMIGUEL
      </CustomLink>
    </StyledRightsFooter>
  </StyledFooterWrapper>
);

export default Footer;
