import styled from 'styled-components';

export const StyledFinder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;

export const StyledAutocompleteMobileWrapper = styled.div`
  width: 100%;
  margin: 0 0 25px;
`;

export const StyledAutocompleteWrapper = styled.div`
  flex: 1;
  margin: 0 0 25px;
  @media only screen and (min-width: 768px) {
    flex: 0.5;
    margin: 0 10px 0 0;
  }
  @media only screen and (min-width: 992px) {
    flex: 1;
    margin: 0;
  }
`;

export const StyledSpacer = styled.span`
  background-color: ${({ theme }) => theme.palette.DARK_SOFT};
  width: 100%;
  height: 1px;
  margin: 0 0 25px 0;
  @media only screen and (min-width: 768px) {
    display: none;
  }
  @media only screen and (min-width: 992px) {
    display: block;
    width: 1px;
    height: 90%;
    margin: 0 20px 0;
  }
`;

export const StyledDropdownsWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 22px;
  &:first-child {
    margin-right: 10px;
  }
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 0;
    &:first-child {
      margin-right: 0;
    }
  }
`;

export const StyledDropdownWrapper = styled.div`
  width: 100%;
  margin: 0 10px 15px 0;
  @media only screen and (min-width: 768px) {
    margin: 0 10px 0 0;
  }
`;

export const StyledButtonWrapper = styled.div`
  flex: 1;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    flex: 0;
    margin-bottom: 0;
  }
`;
