import styled from 'styled-components';

export const StyledSearchPage = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  @media only screen and (min-width: 428px) {
    margin-bottom: 35px;
  }
  @media only screen and (min-width: 1024px) {
    margin-top: 60px;
    padding: 0 30px;
  }
`;

export const StyledCardsWrapper = styled.div<{ isWarningShown: boolean }>`
  margin-top: 20px;
  margin-bottom: ${({ isWarningShown }) => (isWarningShown ? '35px' : '40px')};
  display: flex;
  justify-content: center;
  position: initial;
  @media only screen and (min-width: 640px) {
    justify-content: space-between;
  }
  @media only screen and (min-width: 768px) {
    position: relative;
    justify-content: flex-start;
    margin-top: 35px;
  }
`;

export const StyledWarning = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-align: center;
  color: ${({ theme }) => theme.palette.SECONDARY};
  @media only screen and (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 48px;
  }
  @media only screen and (min-width: 992px) {
    flex-direction: row;
    text-align: left;
    margin-top: 40px;
    margin-bottom: 58px;
    font-size: 1.3rem;
  }
`;

export const StyledWarningIcon = styled.i`
  font-size: 1.7rem;
  margin: 0 0 7px 0;
  @media only screen and (min-width: 992px) {
    margin: 0 5px 0 0;
  }
`;
