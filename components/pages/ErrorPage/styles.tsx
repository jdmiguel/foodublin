import styled from 'styled-components';

import { BlockTitle } from '../../core/BlockTitle/BlockTitle';

export const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 70px;
  @media only screen and (min-width: 428px) {
    margin: 50px auto;
  }
  @media only screen and (min-width: 1024px) {
    margin: 75px auto 60px;
    padding: 0 30px;
  }
`;

export const StyledText = styled(BlockTitle)`
  margin-bottom: 20px;
`;
