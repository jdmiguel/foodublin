import styled, { css } from 'styled-components';

import { CustomLink } from '../../core/CustomLink/CustomLink';

import { fadeAnimation } from '../../../helpers/animations';

const smallDevicesTextCSS = css`
  @media only screen and (max-width: 330px) {
    font-size: 0.85rem;
  }
`;

export const StyledFooterWrapper = styled.footer`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;

export const StyledNavFooterWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
`;

export const StyledNavFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  @media only screen and (min-width: 600px) {
    padding: 15px 20px;
  }
`;

export const StyledCustomLink = styled(CustomLink)`
  ${smallDevicesTextCSS}
`;

export const StyledFooterVeil = styled.div`
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  height: 170px;
  opacity: 0.6;
  ${fadeAnimation};
  @media only screen and (min-width: 768px) {
    height: 150px;
  }
`;

export const StyledRightsFooter = styled.div`
  background-color: ${({ theme }) => theme.palette.SECONDARY};
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

export const StyledBlock = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.LIGHT_SOFT};
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

export const StyledText = styled.p<{ addSeparation: boolean }>`
  font-weight: 300;
  margin-right: ${({ addSeparation }) => addSeparation && '3px'};
  ${smallDevicesTextCSS}
`;