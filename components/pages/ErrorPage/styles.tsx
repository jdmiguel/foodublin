import styled from 'styled-components';

export const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 70px;
  max-width: 1200px;
  @media only screen and (min-width: 428px) {
    margin: 50px auto;
  }
  @media only screen and (min-width: 1024px) {
    margin: 75px auto 60px;
    padding: 0 30px;
  }
`;

export const StyledTextWrapper = styled.div`
  margin-bottom: 20px;
`;
