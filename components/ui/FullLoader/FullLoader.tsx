import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { LoaderType } from '../../../helpers/types';
import { fadeAnimation } from '../../../helpers/animations';

type FullLoaderProps = {
  isShowed?: boolean;
  children: ReactNode;
  type?: LoaderType.CIRCLE | LoaderType.LINE;
};

const FullCircleLoaderWrapperCSS = css`
  display: flex;
  justify-content: center;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  ${fadeAnimation};
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

const StyledFullLoaderWrapper = styled.div<{
  isShowed: boolean;
  type: LoaderType.CIRCLE | LoaderType.LINE;
}>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  ${({ type }) => type === LoaderType.CIRCLE && FullCircleLoaderWrapperCSS}
`;

const StyledFullLoader = styled.div<{
  type: LoaderType.CIRCLE | LoaderType.LINE;
}>`
  ${({ type }) =>
    type === LoaderType.CIRCLE &&
    `position: absolute;
    top: 50vh;`}
`;

export const FullLoader: React.FC<FullLoaderProps> = ({
  isShowed = true,
  children,
  type = LoaderType.CIRCLE,
}) => (
  <StyledFullLoaderWrapper isShowed={isShowed} type={type}>
    <StyledFullLoader type={type}>{children}</StyledFullLoader>
  </StyledFullLoaderWrapper>
);
