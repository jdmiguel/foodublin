import styled, { keyframes } from 'styled-components';

const greetAnimation = keyframes`
  0%,100% { transform: rotate(0) }
  20%,60% { transform: rotate(-25deg) }
  40%,80% { transform: rotate(10deg) }
`;

export const StyledCorner = styled.a`
  svg {
    border: 0;
    color: transparent;
    transition: fill ease-out 250ms;
    fill: ${({ theme }) => theme.palette.PRIMARY_MEDIUM};
  }
  path {
    &:not(:first-of-type) {
      fill: ${({ theme }) => theme.palette.BLACK};
      transform-origin: 130px 106px;
    }
  }
  &:hover {
    svg {
      fill: ${({ theme }) => theme.palette.PRIMARY};
    }
    path {
      &:nth-of-type(2) {
        animation: ${greetAnimation} 560ms ease-in-out;
      }
    }
  }
`;
