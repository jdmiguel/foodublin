import React, { ReactNode } from 'react';

import { StyledCustomLink } from './styles';

import { CustomLinkSize } from '../../../helpers/types';

type CustomLinkProps = {
  className?: string;
  size?: CustomLinkSize;
  route?: string;
  children: ReactNode | string;
  onClick?: () => void;
};

export const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  children,
  size = CustomLinkSize.SMALL,
  route,
  onClick,
}) => (
  <StyledCustomLink
    className={className}
    href={route && route}
    size={size}
    onClick={onClick && onClick}
  >
    {children}
  </StyledCustomLink>
);
