import React, { ReactNode, forwardRef } from 'react';

import { StyledCustomLink } from './styles';

import { CustomLinkSize } from '../../../helpers/types';

type CustomLinkProps = {
  className?: string;
  size?: CustomLinkSize;
  route?: string;
  children: ReactNode | string;
  onClick?: () => void;
};

export const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    { className, children, size = CustomLinkSize.SMALL, route, onClick },
    forwardedRef,
  ) => (
    <StyledCustomLink
      ref={forwardedRef}
      className={className}
      href={route && route}
      size={size}
      onClick={onClick && onClick}
    >
      {children}
    </StyledCustomLink>
  ),
);

CustomLink.displayName = 'CustomLink';
