import styled, { css } from 'styled-components';

export const StyledHeaderWrapper = styled.header<{
  isExtended: boolean;
}>`
  position: ${({ isExtended }) => !isExtended && 'sticky'};
  top: ${({ isExtended }) => !isExtended && '0'};
  z-index: ${({ isExtended }) => !isExtended && '1'};
`;

export const StyledHeader = styled.div<{
  bgImg: string | undefined;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  background-image: url(${({ bgImg }) => bgImg && bgImg});
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  background-size: cover;
  background-position: center;
`;

export const StyledOverlay = styled.div<{ isExtended: boolean }>`
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  height: ${({ isExtended }) => (isExtended ? '550px' : '80px')};
  padding: 0 30px;
  @media only screen and (min-width: 768px) {
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
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  @media only screen and (min-width: 768px) {
    justify-content: space-between;
  }
  @media only screen and (min-width: 1200px) {
    padding: 0;
  }
`;

export const StyledHeaderContent = styled.div<{ isExtended: boolean }>`
  width: 100%;
  height: 100%;
  ${({ isExtended }) => (isExtended ? headerContentCSS : basicHeaderContentCSS)};
  margin: ${({ isExtended }) => !isExtended && '0 auto'};
`;

export const StyledCornerWrapper = styled.div`
  display: none;
  @media only screen and (min-width: 1200px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const StyledHeaderClaim = styled.h2<{
  isExtended: boolean;
}>`
  font-size: ${({ isExtended }) => (isExtended ? '1.25rem' : '1.3rem')};
  text-align: center;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  margin-bottom: ${({ isExtended }) => isExtended && '35px'};
  display: ${({ isExtended }) => !isExtended && 'none'};
  @media only screen and (min-width: 350px) {
    font-size: ${({ isExtended }) => isExtended && '1.4rem'};
  }
  @media only screen and (min-width: 768px) {
    display: ${({ isExtended }) => !isExtended && 'block'};
    font-size: ${({ isExtended }) => isExtended && '2rem'};
  }
  @media only screen and (min-width: 992px) {
    font-size: ${({ isExtended }) => (isExtended ? '2.5rem' : '1.6rem')};
  }
`;

export const StyledHeaderBarWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  padding: 20px 30px;
`;

export const StyledHeaderBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;
