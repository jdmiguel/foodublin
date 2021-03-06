import React, { useState, useEffect, useRef } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { Loader } from '../Loader/Loader';
import { Input } from '../Input/Input';
import { Card } from '../Card/Card';
import { BlockTitle } from '../BlockTitle/BlockTitle';
import { BlockText } from '../BlockText/BlockText';
import { Button } from '../Button/Button';

import {
  StyledAutocompleteMobile,
  StyledLabel,
  StyledLabelButton,
  StyledModal,
  StyleHeading,
  StyleHeadingButton,
  StyledInputWrapper,
  StyledListboxWrapper,
  StyledLoaderWrapper,
  StyledListbox,
  StyledNoSuggestionsWrapper,
  StyledErrorWrapper,
  StyledErrorButtonWrapper,
  StyledListboxItem,
} from './styles/autocompleteMobile';

import { PlaceholderText, DEFAULT_TEXT_LOADING } from '@/store/statics';

import { CardType } from '../types';
import { Restaurant } from '../../pages/types';

export type AutocompleteMobileProps = {
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

export const AutocompleteMobile: React.FC<AutocompleteMobileProps> = ({
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
  const listboxWrapperRef = useRef<HTMLDivElement>(null);
  const isSuggestable = useRef(true);
  const [value, setValue] = useState('');
  const [focusedPlaceholder, setFocusedPlaceholder] = useState(
    PlaceholderText.BLURRED,
  );
  const [labelTextShowed, setLabelTextShowed] = useState(
    PlaceholderText.BLURRED as string,
  );
  const [isModalShowed, setIsModalShowed] = useState(false);
  const [isListboxFocused, setIsListboxFocused] = useState(false);

  useEffect(() => {
    if (isModalShowed && listboxWrapperRef.current) {
      disableBodyScroll(listboxWrapperRef.current);
    } else if (!isModalShowed && listboxWrapperRef.current) {
      setValue('');
      setIsListboxFocused(false);
      enableBodyScroll(listboxWrapperRef.current);
    }
  }, [isModalShowed]);

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
  };

  const handleSuggestionClick = (restaurantId: number, showedText: string) => {
    setValue(showedText);
    setLabelTextShowed(showedText);
    setIsModalShowed(false);
    isSuggestable.current = false;
    selectSuggestion(restaurantId, showedText);
  };

  const handleCloseModal = () => {
    setIsModalShowed(false);
    setIsListboxFocused(false);
  };

  const handleClearSuggestion = () => {
    setValue('');
    clearSuggestions();
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return (
        <StyledNoSuggestionsWrapper>
          <BlockText text="There are no suggestions for this search" />
        </StyledNoSuggestionsWrapper>
      );
    }

    return suggestions.map(({ id, imgSrc, title, content }: Restaurant) => (
      <StyledListboxItem key={id} role="option">
        <Card
          imgSrc={imgSrc}
          title={title}
          content={content}
          onClick={() => handleSuggestionClick(id, title)}
          type={CardType.SUGGESTION}
        />
      </StyledListboxItem>
    ));
  };

  return (
    <StyledAutocompleteMobile
      data-testid="autocomplete"
      className={className}
      disabled={disabled}
    >
      <>
        <StyledLabel data-testid="label">
          <StyledLabelButton
            type="button"
            onClick={() => setIsModalShowed(true)}
          >
            <i data-testid={'label-icon'} className="material-icons">
              search
            </i>
            <span>{labelTextShowed}</span>
          </StyledLabelButton>
        </StyledLabel>
        <StyledModal isShowed={isModalShowed} data-testid="modal">
          <StyleHeading>
            <BlockTitle text="Dublin restaurants" />
            <StyleHeadingButton type="button" onClick={handleCloseModal}>
              <i className="material-icons">close</i>
            </StyleHeadingButton>
          </StyleHeading>
          <StyledInputWrapper>
            <Input
              type="text"
              placeholder={focusedPlaceholder}
              onChange={handleChange}
              value={value}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              hasSearchIcon={hasSearchIcon}
            />
          </StyledInputWrapper>
          <StyledListboxWrapper
            isShowed={isListboxFocused}
            data-testid="listbox-wrapper"
            ref={listboxWrapperRef}
          >
            {loading ? (
              <StyledLoaderWrapper>
                <Loader text={DEFAULT_TEXT_LOADING} />
              </StyledLoaderWrapper>
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
                  renderSuggestions()
                )}
              </StyledListbox>
            )}
          </StyledListboxWrapper>
        </StyledModal>
      </>
    </StyledAutocompleteMobile>
  );
};
