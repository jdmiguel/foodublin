import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Link from 'next/link';

export enum CustomLinkSize {
  BIG = 'big',
  SMALL = 'small',
}

type CustomLinkProps = {
  className?: string;
  size?: CustomLinkSize;
  route: string;
  asRoute?: string;
  children: ReactNode | string;
  isExternal?: boolean;
};

const StyledContent = styled.a<{ size: CustomLinkSize }>`
  font-size: ${({ size }) => (size === 'big' ? '1.3rem' : '1rem')};
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => props.theme.palette.PRIMARY_MEDIUM};
  i {
    font-size: 0.8em;
    margin-right: ${({ size }) => (size === 'big' ? '6px' : '4px')};
  }
  @media only screen and (min-width: 540px) {
    transition: color 0.2s ease-out;
    &:hover {
      color: ${(props) => props.theme.palette.PRIMARY};
    }
  }
`;

const CustomLink = ({
  className,
  children,
  route,
  asRoute,
  size = CustomLinkSize.SMALL,
  isExternal,
}: CustomLinkProps) => (
  <>
    {isExternal ? (
      <StyledContent className={className} href={route} size={size}>
        {children}
      </StyledContent>
    ) : (
      <Link href={route} as={asRoute} passHref={true}>
        <StyledContent className={className} size={size}>
          {children}
        </StyledContent>
      </Link>
    )}
  </>
);

export default CustomLink;
