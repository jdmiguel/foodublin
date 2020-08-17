import React from 'react';
import styled, { keyframes, css } from 'styled-components';

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const animation = css`
  animation: ${rotate} 0.8s linear infinite;
`;

type LoaderProps = {
  className?: string;
  text?: string;
  mode: Mode.LIGHT | Mode.DARK;
};

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLoaderImage = styled.div<{ mode: Mode.LIGHT | Mode.DARK }>`
  border: 2px solid
    ${({ theme, mode }) =>
      mode === Mode.LIGHT
        ? theme.palette.PRIMARY_LIGHT
        : theme.palette.PRIMARY};
  border-top: 2px solid
    ${({ theme, mode }) =>
      mode === Mode.LIGHT
        ? theme.palette.PRIMARY_MEDIUM
        : theme.palette.LIGHT_SOFT};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  ${animation};
`;
const StyledLoaderText = styled.p<{ mode: Mode.LIGHT | Mode.DARK }>`
  margin-top: 8px;
  font-size: 0.85rem;
  color: ${({ theme, mode }) =>
    mode === Mode.LIGHT ? theme.palette.LIGHT_MAX : theme.palette.DARK_MAX};
`;

const Loader: React.FC<LoaderProps> = ({ className, text, mode }) => (
  <StyledLoader className={className}>
    <StyledLoaderImage mode={mode} />
    {text && <StyledLoaderText mode={mode}>{text}</StyledLoaderText>}
  </StyledLoader>
);

export default Loader;
