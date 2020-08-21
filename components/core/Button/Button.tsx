import React, { ReactNode, memo } from 'react';
import styled from 'styled-components';

import Loader, { Mode } from '../Loader/Loader';

type ButtonProps = {
  className?: string;
  children: ReactNode | string;
  onClick?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
};

const StyledButtonWrapper = styled.div<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '200px')};
  height: 55px;
`;

const StyledButton = styled.button<{ fullWidth: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '200px')};
  height: 100%;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 0 15px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  background-color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  color: ${(props) => props.theme.palette.LIGHT_MAX};
  font-weight: 600;
  transition: background-color 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    margin-right: 6px;
    font-size: 1.3em;
  }
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY};
  }
`;

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  loading,
  fullWidth = true,
}) => {
  console.log('button');
  return (
    <StyledButtonWrapper className={className} fullWidth={fullWidth}>
      <StyledButton
        type="button"
        onClick={() => {
          onClick && onClick();
        }}
        fullWidth={fullWidth}
      >
        {loading ? <Loader mode={Mode.LIGHT} /> : children}
      </StyledButton>
    </StyledButtonWrapper>
  );
};

const isLoadingPropChanged = (
  prevProps: ButtonProps,
  nextProps: ButtonProps,
): boolean => !!prevProps.loading === nextProps.loading;

export default memo(Button, isLoadingPropChanged);
