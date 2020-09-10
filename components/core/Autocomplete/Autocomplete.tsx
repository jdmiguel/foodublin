import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Input from '../Input/Input';
import Card, { CardType } from '../Card/Card';
import Loader from '../Loader/Loader';

import {
  PlaceholderText,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Restaurant } from '../../../helpers/types';

export type AutocompleteProps = {
  className?: string;
  hasSearchIcon?: boolean;
  suggestions: Restaurant[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: string, name: string) => void;
};

const StyledAutocomplete = styled.div`
  width: 100%;
  max-width: 550px;
  height: 55px;
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled(Input)<{ hasBorderBottomRadius: boolean }>`
  background-color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }

  ${({ hasBorderBottomRadius }) =>
    !hasBorderBottomRadius &&
    `border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;`}
`;

const StyledListboxWrapper = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transform: translateY(${({ isShowed }) => (isShowed ? '0' : '10px')});
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
  position: absolute;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  z-index: 2;
  top: 55px;
  left: 0;
  padding: 0;
  width: 100%;
  height: auto;
  max-height: 400px;
  overflow: auto;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${(props) => props.theme.palette.LIGHT_MEDIUM};
  border-radius: 0 0 4px 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 0;
`;

const StyledLoader = styled(Loader)`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  @media only screen and (min-width: 992px) {
    min-height: 200px;
  }
`;

const StyledListbox = styled.ul`
  width: 100%;
  -webkit-tap-highlight-color: transparent;
`;

const StyledListboxItem = styled.li`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_MIN};
  list-style: none;
  display: flex;
  background-color: ${(props) => props.theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
`;

export const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  fetchSuggestions,
  selectSuggestion,
  loading,
  hasSearchIcon,
  className,
}) => {
  const blurDelay = useRef(0);
  const isSuggestable = useRef(true);
  const [value, setValue] = useState('');
  const [focusedPlaceholder, setFocusedPlaceholder] = useState(
    PlaceholderText.BLURRED,
  );
  const [isListboxFocused, setIsListboxFocused] = useState(false);

  useEffect(() => {
    if (value.length > 2 && isSuggestable.current) {
      fetchSuggestions(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setIsListboxFocused(currentValue.length > 2);
    setValue(currentValue);
  };

  const handleInputFocus = () => {
    if (!value) {
      setFocusedPlaceholder(PlaceholderText.FOCUSED);
    } else if (value.length > 2) {
      setIsListboxFocused(true);
    }
  };

  const handleInputBlur = () => {
    !value && setFocusedPlaceholder(PlaceholderText.BLURRED);
    blurDelay.current = setTimeout(() => {
      setIsListboxFocused(false);
    }, 100);
  };

  const handleSuggestionClick = (restaurantId: string, showedText: string) => {
    clearTimeout(blurDelay.current);
    setValue(showedText);
    isSuggestable.current = false;
    selectSuggestion(restaurantId, showedText);
  };

  const hasBorderBottomRadius =
    suggestions.length === 0 ||
    !isListboxFocused ||
    (isListboxFocused && value.length < 3);

  return (
    <StyledAutocomplete data-testid="autocomplete" className={className}>
      <StyledInput
        type="text"
        hasBorderBottomRadius={hasBorderBottomRadius}
        placeholder={focusedPlaceholder}
        onChange={handleChange}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        hasSearchIcon={hasSearchIcon}
      />
      <StyledListboxWrapper
        isShowed={isListboxFocused && suggestions.length > 0}
        data-testid="listbox-wrapper"
      >
        {loading ? (
          <StyledLoader text={DEFAULT_TEXT_LOADING} />
        ) : (
          <StyledListbox role="listbox">
            {suggestions.map(
              ({ id, imgSrc, title, content, route, asRoute }: Restaurant) => (
                <StyledListboxItem key={id} role="option">
                  <Card
                    id={id}
                    imgSrc={imgSrc}
                    title={title}
                    content={content}
                    route={route}
                    asRoute={asRoute}
                    onClick={() => handleSuggestionClick(id, title)}
                    type={CardType.SUGGESTION}
                  />
                </StyledListboxItem>
              ),
            )}
          </StyledListbox>
        )}
      </StyledListboxWrapper>
    </StyledAutocomplete>
  );
};

export default Autocomplete;
