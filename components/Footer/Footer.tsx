import React from 'react';
import styled from 'styled-components';

type FooterProps = {
  isExtended: boolean;
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
  padding: 15px 20px;
`;

const StyledNavFooter = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1100px;
  @media only screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

const StyledFavLink = styled.button`
  color: ${(props) => props.theme.palette.PRIMARY};
  font-weight: 600;
  transition: color 0.2s ease-out;
  cursor: pointer;
  background: none;
  outline: none;
  display: none;
  i {
    font-size: 0.9rem;
    margin-right: 4px;
  }
  &:hover {
    color: ${(props) => props.theme.palette.PRIMARY_DARK};
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    align-items: center;
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

const Footer: React.FC<FooterProps> = ({ isExtended, onClickFavourites }) => (
  <StyledFooterWrapper>
    {isExtended && (
      <StyledNavFooterWrapper>
        <StyledNavFooter>
          <div>Home / Search Fast Food in Rathmines / Elephant & Castle</div>
          <StyledFavLink
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              onClickFavourites && onClickFavourites();
            }}
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
