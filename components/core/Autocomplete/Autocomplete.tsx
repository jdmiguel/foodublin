import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

import Input from '../Input/Input';

type Suggestion = {
  id: string;
  thumbSrc: string;
  localName: string;
  locationName: string;
};

export type AutocompleteProps = {
  className?: string;
  loaderSrc: string;
  withSearchIcon?: boolean;
  suggestions: Suggestion[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: string) => void;
};

enum PLACEHOLDER_TEXT {
  BLURRED = 'Search for locals...',
  FOCUSED = 'Start typing to search...',
}

const StyledAutocomplete = styled.div`
  width: 100%;
  max-width: 550px;
  height: 100%;
  position: initial;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    height: 55px;
    position: relative;
  }
`;

const StyledInput = styled(Input)`
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &.active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  input {
    cursor: pointer;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.palette.LIGHT_MAX};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 992px) {
    height: 470px;
  }
  img {
    margin-bottom: 8px;
  }
  p {
    font-size: 0.85rem;
  }
`;

const StyledBoxList = styled.div`
  display: none;
  position: absolute;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.LIGHT_MAX};
  z-index: 2;
  top: 0;
  left: 0;
  padding: 50px 10px 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${(props) => props.theme.palette.LIGHT_MAX};
  border-radius: 0 0 4px 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 0;
  outline: none;
  &.active {
    display: block;
  }
  @media only screen and (min-width: 768px) {
    top: 55px;
    height: auto;
    padding: 0;
    max-height: 440px;
  }
`;

const StyledCloseButton = styled.button`
  display: block;
  position: absolute;
  z-index: 1;
  top: 19px;
  right: 7px;
  cursor: pointer;
  outline: none;
  transition: opacity 0.2s ease-out;
  background-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  i {
    font-size: 1.1rem;
    font-weight: bold;
  }
  &:hover {
    opacity: 0.5;
  }
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledList = styled.ul`
  width: 100%;
`;

const StyledListElement = styled.li`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_MIN};
  list-style: none;
`;

const StyledLink = styled.a`
  display: block;
  overflow: hidden;
  text-decoration: none;
  padding: 6px 11px;
  color: ${(props) => props.theme.palette.DARK_MAX};
  display: flex;
  font-weight: 400;
  width: 100%;
  transition: background-color 0.2s ease-out;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
`;

const StyledThumb = styled.img`
  width: 30px;
  height: 30px;
  border: solid ${(props) => props.theme.palette.LIGHT_MAX} 1px;
  display: inline-block;
  border-radius: 4px;
  -webkit-appearance: button-bevel;
  box-shadow: 1px 2px 5px #888;
`;

const StyledTextWrapper = styled.div`
  margin-left: 12px;
`;

const StyledLocal = styled.p`
  color: ${(props) => props.theme.palette.DARK_MAX};
  font-size: 1.05rem;
`;

const StyledLocation = styled.p`
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-size: 0.85rem;
`;

export const Autocomplete: React.FC<AutocompleteProps> = ({
  loaderSrc,
  suggestions,
  fetchSuggestions,
  selectSuggestion,
  loading,
  withSearchIcon,
  className,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [currentValue, setCurrentValue] = useState('');
  const [focusedPlaceholder, setFocusedPlaceholder] = useState(
    PLACEHOLDER_TEXT.BLURRED,
  );
  const [isBoxListFocused, setIsBoxListFocused] = useState(false);
  const [inputClassName, setInputClassName] = useState('');
  const [listClassName, setListClassName] = useState('');

  useEffect(() => {
    if (currentValue.length > 2 && fetchSuggestions) {
      fetchSuggestions(currentValue);
    }
  }, [currentValue, fetchSuggestions]);

  useLayoutEffect(() => {
    if (isBoxListFocused) {
      setListClassName('active');
      setInputClassName('active');
      listRef.current?.focus();
    } else {
      setListClassName('');
      setInputClassName('');
    }
  }, [isBoxListFocused, listClassName, inputClassName]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setIsBoxListFocused(currentValue.length > 2);
    setCurrentValue(currentValue);
  };

  const handleInputFocus = () => {
    setFocusedPlaceholder(PLACEHOLDER_TEXT.FOCUSED);
    currentValue.length > 2 && setIsBoxListFocused(true);
  };

  const handleInputBlur = () => {
    setFocusedPlaceholder(PLACEHOLDER_TEXT.BLURRED);
    !isBoxListFocused && setIsBoxListFocused(false);
  };

  const handleListBlur = () => {
    isBoxListFocused && setIsBoxListFocused(false);
  };

  const handleSuggestionClick = (
    event: React.MouseEvent,
    id: string,
    localName: string,
  ) => {
    event.preventDefault();

    selectSuggestion(id);
    setCurrentValue(localName);
    setIsBoxListFocused(false);
  };

  return (
    <StyledAutocomplete data-testid="autocomplete" className={className}>
      <StyledInput
        type="text"
        placeholder={focusedPlaceholder}
        onChange={handleChange}
        value={currentValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        withSearchIcon={withSearchIcon}
        className={inputClassName}
      />
      <StyledBoxList
        role="listbox"
        ref={listRef}
        onBlur={handleListBlur}
        tabIndex={0}
        data-testid="autocomplete-box-list"
        className={listClassName}
      >
        <StyledCloseButton
          type="button"
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            setIsBoxListFocused(false);
          }}
        >
          <i className="material-icons">close</i>
        </StyledCloseButton>
        {loading ? (
          <StyledLoader>
            <img src={loaderSrc} alt="loader" />
            <p>Coming right up...</p>
          </StyledLoader>
        ) : (
          <StyledList>
            {suggestions.map(
              ({ id, thumbSrc, localName, locationName }: Suggestion) => (
                <StyledListElement key={id}>
                  <StyledLink
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                      handleSuggestionClick(event, id, localName);
                    }}
                  >
                    <StyledThumb src={thumbSrc} alt={localName} />
                    <StyledTextWrapper>
                      <StyledLocal>{localName}</StyledLocal>
                      <StyledLocation>{locationName}</StyledLocation>
                    </StyledTextWrapper>
                  </StyledLink>
                </StyledListElement>
              ),
            )}
          </StyledList>
        )}
      </StyledBoxList>
    </StyledAutocomplete>
  );
};

export default Autocomplete;
