import styled, { css } from 'styled-components';

export const StyledDropdown = styled.div<{ disabled: boolean }>`
  pointer-events: ${({ disabled }) => disabled && 'none'};
  @media only screen and (min-width: 768px) {
    position: relative;
  }
`;

export const StyledLabel = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
`;

export const StyledLabelButton = styled.button<{ clearable: boolean }>`
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
  transition: background-color 0.2s ease-out;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  i {
    &:first-of-type {
      font-size: 1rem;
      margin-left: 5px;
      margin-right: 10px;
      color: ${({ theme }) => theme.palette.PRIMARY_DARK};
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }

  ${(props) => {
    if (props.clearable) {
      return `background-color: ${props.theme.palette.PRIMARY_LIGHT}`;
    } else {
      return `i {
      &:last-of-type {
        position: absolute;
        z-index: 1;
        top: 14px;
        right: 7px;
        font-size: 1.7rem;
      }
    }`;
    }
  }}
`;

export const StyledListbox = styled.div<{ isListboxFocused: boolean }>`
  visibility: ${({ isListboxFocused }) => (isListboxFocused ? 'visible' : 'hidden')};
  opacity: ${({ isListboxFocused }) => (isListboxFocused ? '1' : '0')};
  overflow: auto;
  transition: opacity 0.2s ease 0s;
  position: absolute;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 2;
  top: 0;
  left: 0;
  padding: 20px 10px 10px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-radius: 4px;
  border-top: 0;
  border-bottom: 0;
  outline: none;
  @media only screen and (min-width: 768px) {
    max-height: 440px;
    height: auto;
    padding: 0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
    transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
    transform: translateY(${({ isListboxFocused }) => (isListboxFocused ? '0' : '20px')});
  }
`;

const closeButtonCSS = css`
  cursor: pointer;
  line-height: 0;
  background-color: transparent;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  i {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

export const StyledCloseButton = styled.button`
  ${closeButtonCSS}
  position: absolute;
  z-index: 1;
  top: 19px;
  right: 7px;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 0.5;
  }
`;

export const StyledMobileHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin: 10px 0 15px;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const StyledMobileHeadingButton = styled.button`
  ${closeButtonCSS}
  margin-top: 4px;
  i {
    color: ${({ theme }) => theme.palette.DARK_MEDIUM};
    font-size: 1.5rem;
  }
`;

export const StyledListboxItem = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_MIN};
  list-style: none;
  display: block;
  overflow: hidden;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 9px 11px;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
`;

export const StyledListboxItemIcon = styled.img`
  width: 18px;
  margin-right: 12px;
`;

export const StyledListboxItemText = styled.p<{ isActive: boolean }>`
  color: ${({ theme }) => theme.palette.DARK_MAX};
  font-size: 1rem;
  font-weight: ${({ isActive }) => (!isActive ? 400 : 600)};
  @media only screen and (min-width: 992px) {
    font-size: 0.9rem;
  }
`;
