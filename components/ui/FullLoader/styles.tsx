import styled, { css } from 'styled-components';

import { fadeInAnimation } from '@/helpers/animations';

import { LoaderType } from '../../core/types';

const FullCircleLoaderWrapperCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  ${fadeInAnimation};
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

export const StyledFullLoaderWrapper = styled.div<{
  isShowed: boolean;
  type: LoaderType.CIRCLE | LoaderType.LINE;
}>`
  width: 100%;
  height: calc(100% - 80px);
  position: fixed;
  z-index: 1;
  left: 0;
  top: ${({ type }) => (type === LoaderType.CIRCLE ? '80px' : 0)};
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  ${({ type }) => type === LoaderType.CIRCLE && FullCircleLoaderWrapperCSS}
`;
