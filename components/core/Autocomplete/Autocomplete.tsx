import React, { useState, useEffect, useRef } from 'react';

import { Card } from '../Card/Card';
import { BlockText } from '../BlockText/BlockText';
import { Button } from '../Button/Button';

import {
  StyledAutocomplete,
  StyledInput,
  StyledListboxWrapper,
  StyledLoader,
  StyledListbox,
  StyledErrorWrapper,
  StyledErrorButtonWrapper,
  StyledListboxItem,
} from './styles/autocomplete';

import { PlaceholderText, DEFAULT_TEXT_LOADING } from '@/store/statics';

import { Restaurant } from '../../pages/types';
import { CardType } from '../types';

export type AutocompleteProps = {
  hasSearchIcon?: boolean;
  suggestions: Restaurant[];
  loading: boolean;
  className?: string;
  disabled: boolean;
  onRequestError: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: number, name: string) => void;
  clearSuggestions: () => void;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  suggestions,
  fetchSuggestions,
  selectSuggestion,
  loading,
  hasSearchIcon,
  className,
  disabled,
  onRequestError,
  clearSuggestions,
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
    blurDelay.current = window.setTimeout(() => {
      setIsListboxFocused(false);
    }, 100);
  };

  const handleSuggestionClick = (restaurantId: number, showedText: string) => {
    clearTimeout(blurDelay.current);

    setValue(showedText);
    setIsListboxFocused(false);
    isSuggestable.current = false;

    selectSuggestion(restaurantId, showedText);
  };

  const handleClearSuggestion = () => {
    setValue('');
    clearSuggestions();
  };

  const hasBorderBottomRadius =
    suggestions.length === 0 ||
    !isListboxFocused ||
    (isListboxFocused && value.length < 3);

  return (
    <StyledAutocomplete
      data-testid="autocomplete"
      className={className}
      disabled={disabled}
    >
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
        isShowed={isListboxFocused}
        data-testid="listbox-wrapper"
      >
        {loading ? (
          <StyledLoader
            className="listbox-loader"
            text={DEFAULT_TEXT_LOADING}
          />
        ) : (
          <StyledListbox role="listbox">
            {onRequestError ? (
              <StyledErrorWrapper>
                <BlockText text="Sorry but something was wrong..." />
                <StyledErrorButtonWrapper>
                  <Button onClick={handleClearSuggestion}>Try again</Button>
                </StyledErrorButtonWrapper>
              </StyledErrorWrapper>
            ) : (
              suggestions.map(({ id, imgSrc, title, content }: Restaurant) => (
                <StyledListboxItem key={id} role="option">
                  <Card
                    imgSrc={imgSrc}
                    title={title}
                    content={content}
                    onClick={() => handleSuggestionClick(id, title)}
                    type={CardType.SUGGESTION}
                  />
                </StyledListboxItem>
              ))
            )}
          </StyledListbox>
        )}
      </StyledListboxWrapper>
    </StyledAutocomplete>
  );
};
