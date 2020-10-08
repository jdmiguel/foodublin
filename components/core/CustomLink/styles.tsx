import styled from 'styled-components';

import { CustomLinkSize } from '../../../helpers/types';

export const StyledCustomLink = styled.a<{ size: CustomLinkSize }>`
  font-size: ${({ size }) => (size === 'big' ? '1.3rem' : '1rem')};
  display: flex;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
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
