import { keyframes, css } from 'styled-components';

const fadeIn = (endValue: number) => keyframes`
  0% { opacity: 0 }
  100% { opacity: ${endValue} }
`;

const fadeInFromPosY = (initialPosY: number) => keyframes`
  0% { opacity: 0; transform: translateY(${initialPosY}px); }
  100% { opacity: 1; ; transform: translateY(0); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const moveX = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

export const fadeInAnimation = css<{ endValue?: number }>`
  animation: ${({ endValue }) => fadeIn(endValue || 1)} 0.15s linear;
`;

export const fadeInFromPosYAnimation = css<{
  initialPosY?: number;
  animationDuration?: number;
  animationDelay?: number;
}>`
  animation-name: ${({ initialPosY }) => fadeInFromPosY(initialPosY || 50)};
  animation-duration: ${({ animationDuration }) => animationDuration || 0.15}s;
  animation-delay: ${({ animationDelay }) => animationDelay || 0.25}s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;

export const circleLoaderAnimation = css`
  animation: ${rotate} 0.8s linear infinite;
`;

export const lineLoaderAnimation = css`
  animation: ${moveX} 1s ease-in-out infinite forwards;
`;
