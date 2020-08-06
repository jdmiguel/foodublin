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

const StyledLoaderImage = styled.div`
  border: 2px solid ${(props) => props.theme.palette.PRIMARY};
  border-top: 2px solid ${(props) => props.theme.palette.PRIMARY_LIGHT};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
  ${animation};
`;
const StyledLoaderText = styled.p`
  font-size: 0.85rem;
`;

const Loader: React.FC<LoaderProps> = ({ className, text }) => (
  <StyledLoader className={className}>
    <StyledLoaderImage />
    {text && <StyledLoaderText>{text}</StyledLoaderText>}
  </StyledLoader>
);

export default Loader;
