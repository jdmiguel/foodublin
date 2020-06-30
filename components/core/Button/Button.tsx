import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  className?: string;
  buttonTxt: string;
  onClick?: (event: React.MouseEvent) => void;
  loading?: boolean;
  loaderSrc?: string;
};

const StyledButtonWrapper = styled.div`
  width: 100%;
  max-width: 123px;
  height: 55px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 55px;
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
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY};
  }
`;

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  buttonTxt,
  loading,
  loaderSrc,
}) => (
  <StyledButtonWrapper className={className}>
    <StyledButton
      type="button"
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        onClick && onClick(event);
      }}
    >
      {loading ? <img src={loaderSrc && loaderSrc} alt="loader" /> : buttonTxt}
    </StyledButton>
  </StyledButtonWrapper>
);

export default Button;
