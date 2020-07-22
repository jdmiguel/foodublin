import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../core/Breadcrumbs/Breadcrumbs';

type FooterProps = {
  isExtended: boolean;
  onClickBreadcrumbs?: (link: string) => void;
  onClickFavourites?: () => void;
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

const StyledFavLink = styled.button<{ breadcrumbsSteps: number }>`
  font-weight: 600;
  cursor: pointer;
  background: none;
  outline: none;
  display: flex;
  align-items: center;
  margin-top: 7px;
  align-self: ${({ breadcrumbsSteps }) => breadcrumbsSteps > 2 && 'flex-end'};
  i {
    font-size: 0.9rem;
    margin-right: 4px;
  }
  color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  transition: color 0.2s ease-out;
  &:hover {
    color: ${(props) => props.theme.palette.PRIMARY};
  }
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

const StyledLink = styled.a`
  color: ${(props) => props.theme.palette.LIGHT_SOFT};
  font-weight: 600;
  font-size: 0.9em;
  text-decoration: none;
  transition: color 0.2s ease-out;
  &:hover {
    color: ${(props) => props.theme.palette.LIGHT_MAX};
  }
  @media only screen and (min-width: 375px) {
    font-size: 1em;
  }
`;

const breadrumbsData = [
  { text: 'Home', link: '/' },
  {
    text: 'Search Restaurants',
    link: '/search/rathmines/fast-food',
  },
  { text: 'Restaurant Details', link: '/detail/elefant-castle' },
];

const Footer: React.FC<FooterProps> = ({
  isExtended,
  onClickBreadcrumbs,
  onClickFavourites,
}) => (
  <StyledFooterWrapper>
    {isExtended && (
      <StyledNavFooterWrapper>
        <StyledNavFooter className="grid-container">
          <Breadcrumbs
            breadcrumbsData={breadrumbsData}
            onClick={(link: string) =>
              onClickBreadcrumbs && onClickBreadcrumbs(link)
            }
          />
          <StyledFavLink
            onClick={() => onClickFavourites && onClickFavourites()}
            breadcrumbsSteps={breadrumbsData.length}
          >
            <i className="material-icons">bookmarks</i>FAVOURITES
          </StyledFavLink>
        </StyledNavFooter>
      </StyledNavFooterWrapper>
    )}
    <StyledRightsFooter>
      <StyledText>FOODUBLIN</StyledText>
      <StyledText>COPYRIGHT ©2020</StyledText>
      <StyledText>BY</StyledText>
      <StyledLink href="https://jdmiguel.netlify.app/" target="_blank">
        JDMIGUEL
      </StyledLink>
    </StyledRightsFooter>
  </StyledFooterWrapper>
);

export default Footer;
