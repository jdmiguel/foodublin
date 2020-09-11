import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Breadcrumbs from '../core/Breadcrumbs/Breadcrumbs';
import CustomLink from '../core/CustomLink/CustomLink';

import { InitialState } from '../../store/reducer';

import { fadeAnimation } from '../../helpers/animations';

type FooterProps = {
  showVeil?: boolean;
  isExtended?: boolean;
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
  @media only screen and (min-width: 540px) {
    padding: 15px 20px;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledCustomLink = styled(CustomLink)<{ breadcrumbsSteps: number }>`
  margin-top: 7px;
  @media only screen and (min-width: 540px) {
    margin-top: 0;
  }
`;

const StyledFooterVeil = styled.div`
  background-color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  opacity: 0.6;
  height: 170px;
  ${fadeAnimation};
  @media only screen and (min-width: 768px) {
    height: 150px;
  }
`;

const StyledRightsFooter = styled.div`
  background-color: ${(props) => props.theme.palette.SECONDARY};
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const StyledBlock = styled.div`
  display: flex;
  color: ${(props) => props.theme.palette.LIGHT_SOFT};
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
`;

const StyledText = styled.p<{ addSeparation: boolean }>`
  font-weight: 300;
  margin-right: ${({ addSeparation }) => addSeparation && '3px'};
`;

const Footer: React.FC<FooterProps> = ({
  showVeil = false,
  isExtended = false,
}) => {
  const breadcrumbs = useSelector((state: InitialState) => state.breadcrumbs);

  return (
    <StyledFooterWrapper>
      {showVeil && <StyledFooterVeil />}
      {isExtended && (
        <StyledNavFooterWrapper>
          <StyledNavFooter className="grid-container">
            <Breadcrumbs breadcrumbsData={breadcrumbs} />
            <StyledCustomLink breadcrumbsSteps={breadcrumbs.length} route="/">
              <i className="material-icons">bookmarks</i>FAVORITES
            </StyledCustomLink>
          </StyledNavFooter>
        </StyledNavFooterWrapper>
      )}
      <StyledRightsFooter>
        <StyledBlock>
          <CustomLink
            route="https://github.com/jdmiguel/foodublin"
            isExternal={true}
          >
            GITHUB
          </CustomLink>
        </StyledBlock>
        <StyledBlock>
          <StyledText addSeparation={false}>FOODUBLIN ©2020</StyledText>
        </StyledBlock>
        <StyledBlock>
          <StyledText addSeparation={true}>BY</StyledText>
          <CustomLink route="https://jdmiguel.netlify.app/" isExternal={true}>
            JDMIGUEL
          </CustomLink>
        </StyledBlock>
      </StyledRightsFooter>
    </StyledFooterWrapper>
  );
};

export default Footer;
