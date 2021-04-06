import styled from 'styled-components';

export const StyledFinder = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 470px) {
    width: 70%;
  }
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
  @media only screen and (min-width: 992px) {
    width: 58rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 1250px) {
    width: 71rem;
  }
`;

export const StyledAutocompleteMobileWrapper = styled.div`
  width: 100%;
  margin: 0 0 25px;
`;

export const StyledAutocompleteWrapper = styled.div`
  width: 100%;
  margin: 0 0 25px;
  @media only screen and (min-width: 992px) {
    margin: 0 2% 0 0;
    width: 39%;
  }
  @media only screen and (min-width: 1200px) {
    width: 44%;
  }
`;

export const StyledSpacer = styled.span`
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  width: 100%;
  height: 1px;
  margin: 0 0 25px 0;
  max-width: 550px;
  @media only screen and (min-width: 992px) {
    width: 1px;
    height: 90%;
    margin: 0 2% 0 0;
  }
`;

export const StyledDropdownsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 22px;
  &:first-child {
    margin-right: 2%;
  }
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media only screen and (min-width: 992px) {
    width: 47%;
    justify-content: space-around;
    margin-bottom: 0;
    &:first-child {
      margin-right: 0;
    }
  }
`;

export const StyledDropdownWrapper = styled.div`
  width: 100%;
  &:first-of-type {
    margin-right: 2%;
    margin-bottom: 15px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 270px;
    &:first-of-type {
      margin-bottom: 0;
    }
  }
  @media only screen and (min-width: 992px) {
    margin-right: 2%;
    width: 48%;
  }
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    width: 300px;
    margin-bottom: 0;
  }
  @media only screen and (min-width: 992px) {
    width: 10%;
  }
`;
