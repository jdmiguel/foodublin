import styled, { css } from 'styled-components';
import { fadeInAnimation } from '@/helpers/animations';

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
  z-index: 1;
`;

export const StyledFooterVeil = styled.div`
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  height: 170px;
  opacity: 0.6;
  ${fadeInAnimation};
  @media only screen and (min-width: 768px) {
    height: 150px;
  }
`;

export const StyledFooter = styled.div`
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

export const StyledFooterBarWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
`;

export const StyledFooterBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  @media only screen and (min-width: 600px) {
    padding: 15px 30px;
  }
  @media only screen and (min-width: 768px) {
    padding: 15px 35px;
  }
  @media only screen and (min-width: 1024px) {
    padding: 15px 48px;
  }
  @media only screen and (min-width: 1200px) {
    padding: 15px 30px;
  }
`;
