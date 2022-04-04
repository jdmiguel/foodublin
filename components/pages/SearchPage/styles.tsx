import styled from 'styled-components';

export const StyledSearchPage = styled.div`
  max-width: 1200px;
  margin: 50px auto;
`;

export const StyledCardsWrapper = styled.div<{ isWarningShown: boolean }>`
  margin-top: 20px;
  margin-bottom: ${({ isWarningShown }) => (isWarningShown ? '35px' : '40px')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  gap: 30px;
  @media only screen and (min-width: 768px) {
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
