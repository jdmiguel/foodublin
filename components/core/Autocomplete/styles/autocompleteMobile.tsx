import styled from 'styled-components';

export const StyledAutocompleteMobile = styled.div<{ disabled: boolean }>`
  height: 100%;
  pointer-events: ${({ disabled }) => disabled && 'none'};
`;

export const StyledLabel = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
`;

export const StyledLabelButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  line-height: 55px;
  padding: 0 4px 0 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  i {
    font-size: 1.2rem;
    margin-left: 5px;
    margin-right: 10px;
    color: ${({ theme }) => theme.palette.DARK_SOFT};
  }
  span {
    color: ${({ theme }) => theme.palette.DARK_SOFT};
  }
`;

export const StyledModal = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transition: opacity 0.2s ease 0s;
  position: fixed;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 2;
  max-width: 767px;
  top: 0;
  left: 0;
  padding: 20px 20px 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-radius: 0 0 4px 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 0;
`;

export const StyleHeading = styled.div`
  margin: 15px 0 25px;
  display: flex;
  justify-content: space-between;
`;

export const StyleHeadingButton = styled.button`
  display: block;
  transition: opacity 0.2s ease-out;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  i {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  }
`;

export const StyledInputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }

  input {
    cursor: pointer;
  }
`;

export const StyledListboxWrapper = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transition: opacity 0.2s ease 0s;
  position: absolute;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 1;
  top: 150px;
  left: 0;
  padding: 0 10px 173px;
  margin-top: 15px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-radius: 4px;
`;

export const StyledLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

export const StyledListbox = styled.ul`
  width: 100%;
`;

export const StyledNoSuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const StyledErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const StyledErrorButtonWrapper = styled.div`
  width: 150px;
  margin-top: 20px;
`;

export const StyledListboxItem = styled.li`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_MIN};
  list-style: none;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  display: flex;
  transition: background-color 0.2s ease-out;
  outline: none;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
`;
