import React from 'react';

import {
  StyledCircleLoader,
  StyledCircleLoaderImage,
  StyledCircleLoaderText,
  StyledLineLoader,
  StyledLineLoaderShape,
} from './styles';

import { LoaderMode, LoaderType } from '../../../helpers/types';

type LoaderProps = {
  className?: string;
  text?: string;
  type?: LoaderType.CIRCLE | LoaderType.LINE;
  mode?: LoaderMode.DARK | LoaderMode.LIGHT;
};

export const Loader: React.FC<LoaderProps> = ({
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
