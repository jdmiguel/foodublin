import styled, { css } from 'styled-components';

import { CustomLinkSize } from '../types';

const disabledCSS = css`
  pointer-events: none;
  color: ${({ theme }) => theme.palette.DARK_SOFT};
  font-weight: 400;
`;

export const StyledCustomLink = styled.a<{
  size: CustomLinkSize;
  disabled: boolean;
}>`
  font-size: ${({ size }) => (size === 'big' ? '1.3rem' : '1rem')};
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
  ${({ disabled }) => disabled && disabledCSS};
  i {
    font-size: 0.8em;
    margin-right: ${({ size }) => (size === 'big' ? '6px' : '4px')};
  }
  @media only screen and (min-width: 540px) {
    transition: color 0.2s ease-out;
    &:hover {
      color: ${({ theme }) => theme.palette.PRIMARY};
    }
  }
`;
