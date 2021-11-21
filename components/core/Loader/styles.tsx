import styled from 'styled-components';

import { circleLoaderAnimation, lineLoaderAnimation } from '../../../helpers/animations';

import { LoaderMode } from '../../core/types';

// Circle loader
export const StyledCircleLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledCircleLoaderImage = styled.div<{
  mode: LoaderMode.DARK | LoaderMode.LIGHT;
}>`
  border: 2px solid
    ${({ theme, mode }) =>
      mode === LoaderMode.DARK ? theme.palette.PRIMARY : theme.palette.PRIMARY_LIGHT};
  border-top: 2px solid
    ${({ theme, mode }) =>
      mode === LoaderMode.DARK ? theme.palette.LIGHT_SOFT : theme.palette.PRIMARY_MEDIUM};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  ${circleLoaderAnimation};
`;

export const StyledCircleLoaderText = styled.p<{
  mode: LoaderMode.DARK | LoaderMode.LIGHT;
}>`
  margin-top: 8px;
  font-size: 0.85rem;
  color: ${({ theme, mode }) =>
    mode === LoaderMode.DARK ? theme.palette.DARK_MAX : theme.palette.LIGHT_MAX};
`;

// Line loader
export const StyledLineLoader = styled.div`
  width: 100%;
`;

export const StyledLineLoaderShape = styled.span`
  display: block;
  width: 100%;
  height: 5px;
  background: ${({ theme }) => theme.palette.PRIMARY};
  ${lineLoaderAnimation};
`;
