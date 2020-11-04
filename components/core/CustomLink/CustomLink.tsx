import React, { ReactNode } from 'react';

import { StyledCustomLink } from './styles';

import { CustomLinkSize } from '../../../helpers/types';

type CustomLinkProps = {
  className?: string;
  size?: CustomLinkSize;
  route?: string;
  disabled?: boolean;
  children: ReactNode | string;
  onClick?: () => void;
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  children,
  size = CustomLinkSize.SMALL,
  route,
  disabled = false,
  onClick,
}) => (
  <StyledCustomLink
    className={className}
    href={route && route}
    disabled={disabled}
    size={size}
    onClick={onClick && onClick}
  >
    {children}
  </StyledCustomLink>
);
