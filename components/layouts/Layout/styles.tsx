import styled from 'styled-components';

import { fadeInAnimation } from '@/helpers/animations';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

export const StyledMain = styled.main`
  margin-bottom: 60px;
  padding: 0 30px;
`;

export const StyledScrollUpButtonWrapper = styled.div<{
  isShown: boolean;
}>`
  position: fixed;
  bottom: 1%;
  right: 4%;
  z-index: 1;
  display: ${({ isShown }) => !isShown && 'none'};
  ${fadeInAnimation};
`;
