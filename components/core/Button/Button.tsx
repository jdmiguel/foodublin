import { ReactNode } from 'react';
import { StyledButtonWrapper, StyledButton } from './styles';
import { Loader } from '../Loader/Loader';
import { LoaderMode } from '../types';

type ButtonProps = {
  className?: string;
  children: ReactNode | string;
  onClick?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  isFloating?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  children,
  loading,
  fullWidth = true,
  isFloating = false,
}) => (
  <StyledButtonWrapper
    className={className}
    fullWidth={fullWidth}
    isFloating={isFloating}
  >
    <StyledButton
      type="button"
      onClick={() => {
        onClick && onClick();
      }}
      fullWidth={fullWidth}
      isFloating={isFloating}
    >
      {loading ? <Loader mode={LoaderMode.LIGHT} /> : children}
    </StyledButton>
  </StyledButtonWrapper>
);
