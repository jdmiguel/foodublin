import { keyframes, css } from 'styled-components';

const fade = keyframes`
  0% { opacity: 0 }
  100% { opacity: 0.6 }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const move = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

export const fadeAnimation = css`
  animation: ${fade} 0.15s linear;
`;

export const rotateAnimation = css`
  animation: ${rotate} 0.8s linear infinite;
`;

export const moveAnimation = css`
  animation: ${move} 1s ease-in-out infinite forwards;
`;