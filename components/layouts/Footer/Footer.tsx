import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import Breadcrumbs from '../../core/Breadcrumbs/Breadcrumbs';
import CustomLink from '../../core/CustomLink/CustomLink';

import { InitialAppState } from '../../../helpers/types';
import { fadeAnimation } from '../../../helpers/animations';

type FooterProps = {
  showVeil?: boolean;
  isExtended?: boolean;
};

const smallDevicesTextCSS = css`
  @media only screen and (max-width: 330px) {
    font-size: 0.85rem;
  }
`;

const StyledFooterWrapper = styled.footer`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;

const StyledNavFooterWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
`;

const StyledNavFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  @media only screen and (min-width: 600px) {
    padding: 15px 20px;
  }
`;

const StyledCustomLink = styled(CustomLink)`
  ${smallDevicesTextCSS}
`;

const StyledFooterVeil = styled.div`
  background-color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  height: 170px;
  opacity: 0.6;
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
  ${smallDevicesTextCSS}
`;

const StyledText = styled.p<{ addSeparation: boolean }>`
  font-weight: 300;
  margin-right: ${({ addSeparation }) => addSeparation && '3px'};
  ${smallDevicesTextCSS}
`;

const Footer: React.FC<FooterProps> = ({
  showVeil = false,
  isExtended = false,
}) => {
  const { breadcrumbs } = useSelector((state: InitialAppState) => state);

  return (
    <StyledFooterWrapper>
      {showVeil && <StyledFooterVeil endValue={0.6} />}
      {isExtended && (
        <StyledNavFooterWrapper>
          <StyledNavFooter className="grid-container">
            <Breadcrumbs breadcrumbsData={breadcrumbs || []} />
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

export default Footer;