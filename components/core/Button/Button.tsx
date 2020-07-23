import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  className?: string;
  children: ReactNode | string;
  onClick?: () => void;
  loading?: boolean;
  loaderSrc?: string;
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
`;

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  loading,
  loaderSrc,
  fullWidth = true,
}) => (
  <StyledButtonWrapper className={className} fullWidth={fullWidth}>
    <StyledButton
      type="button"
      onClick={() => {
        onClick && onClick();
      }}
      fullWidth={fullWidth}
    >
      {loading ? <img src={loaderSrc && loaderSrc} alt="loader" /> : children}
    </StyledButton>
  </StyledButtonWrapper>
);

export default Button;
