import styled, { css } from 'styled-components';

import { CustomLink } from '../../core/CustomLink/CustomLink';

export const StyledHeader = styled.header<{
  bgImg: string | undefined;
  isExtended: boolean;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  background-image: url(${({ bgImg }) => bgImg && bgImg});
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  background-size: cover;
  background-position: center;
  position: ${({ isExtended }) => !isExtended && 'sticky'};
  top: ${({ isExtended }) => !isExtended && '0'};
  z-index: ${({ isExtended }) => !isExtended && '1'};
`;

export const StyledOverlay = styled.div<{ isExtended: boolean }>`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  height: ${({ isExtended }) => (isExtended ? '550px' : '80px')};
  @media only screen and (min-width: 992px) {
    height: ${({ isExtended }) => (isExtended ? '440px' : '80px')};
  }
`;

const headerContentCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const basicHeaderContentCSS = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1140px;
  @media only screen and (min-width: 1200px) {
    justify-content: space-between;
  }
`;

export const StyledHeaderContent = styled.div<{ isExtended: boolean }>`
  width: 100%;
  height: 100%;
  ${({ isExtended }) =>
    isExtended ? headerContentCSS : basicHeaderContentCSS};
  margin: ${({ isExtended }) => !isExtended && '0 auto'};
`;

export const StyledHeaderClaim = styled.h2<{ isExtended: boolean }>`
  font-size: ${({ isExtended }) => (isExtended ? '1.25rem' : '1.3rem')};
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  margin-bottom: ${({ isExtended }) => isExtended && '35px'};
  display: ${({ isExtended }) => !isExtended && 'none'};
  @media only screen and (min-width: 350px) {
    font-size: ${({ isExtended }) => isExtended && '1.45rem'};
  }
  @media only screen and (min-width: 768px) {
    display: ${({ isExtended }) => !isExtended && 'block'};
    font-size: ${({ isExtended }) => isExtended && '2rem'};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${({ isExtended }) => (isExtended ? '2.5rem' : '1.6rem')};
  }
`;

export const StyledCustomLink = styled(CustomLink)`
  @media only screen and (max-width: 539px) {
    color: ${({ theme }) => theme.palette.LIGHT_MAX};
    padding: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
    i {
      margin-right: 0;
    }
  }
`;

export const StyledCustomLinkText = styled.span`
  display: none;
  @media only screen and (min-width: 540px) {
    display: block;
  }
`;
