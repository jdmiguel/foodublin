import React from 'react';
import styled from 'styled-components';

import { LoaderType } from '../../../helpers/types';
import { rotateAnimation, moveAnimation } from '../../../helpers/animations';

export enum LoaderMode {
  DARK = 'dark',
  LIGHT = 'light',
}

type LoaderProps = {
  className?: string;
  text?: string;
  type?: LoaderType.CIRCLE | LoaderType.LINE;
  mode?: LoaderMode.DARK | LoaderMode.LIGHT;
};

// Circle loader
const StyledCircleLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCircleLoaderImage = styled.div<{
  mode: LoaderMode.DARK | LoaderMode.LIGHT;
}>`
  border: 2px solid
    ${({ theme, mode }) =>
      mode === LoaderMode.DARK
        ? theme.palette.PRIMARY
        : theme.palette.PRIMARY_LIGHT};
  border-top: 2px solid
    ${({ theme, mode }) =>
      mode === LoaderMode.DARK
        ? theme.palette.LIGHT_SOFT
        : theme.palette.PRIMARY_MEDIUM};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  ${rotateAnimation};
`;

const StyledCircleLoaderText = styled.p<{
  mode: LoaderMode.DARK | LoaderMode.LIGHT;
}>`
  margin-top: 8px;
  font-size: 0.85rem;
  color: ${({ theme, mode }) =>
    mode === LoaderMode.DARK
      ? theme.palette.DARK_MAX
      : theme.palette.LIGHT_MAX};
`;

// Line loader
const StyledLineLoader = styled.div`
  width: 100%;
`;

const StyledLineLoaderShape = styled.span`
  display: block;
  width: 100%;
  height: 7px;
  background: ${(props) => props.theme.palette.PRIMARY};
  ${moveAnimation};
`;

const Loader: React.FC<LoaderProps> = ({
  className,
  text,
  type = LoaderType.CIRCLE,
  mode = LoaderMode.DARK,
}) =>
  type === LoaderType.CIRCLE ? (
    <StyledCircleLoader className={className}>
      <StyledCircleLoaderImage mode={mode} />
      {text && (
        <StyledCircleLoaderText mode={mode}>{text}</StyledCircleLoaderText>
      )}
    </StyledCircleLoader>
  ) : (
    <StyledLineLoader className={className}>
      <StyledLineLoaderShape />
    </StyledLineLoader>
  );

export default Loader;
