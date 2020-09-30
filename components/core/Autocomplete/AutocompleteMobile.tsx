import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { Card } from '../Card/Card';

import {
  StyledAutocompleteMobile,
  StyledLabel,
  StyledLabelButton,
  StyledModal,
  StyleHeading,
  StyleHeadingText,
  StyleHeadingButton,
  StyledInput,
  StyledListboxWrapper,
  StyledLoader,
  StyledListbox,
  StyledListboxItem,
} from './styles/autocompleteMobile';

import {
  PlaceholderText,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Restaurant, CardType } from '../../../helpers/types';

export type AutocompleteMobileProps = {
  className?: string;
  hasSearchIcon?: boolean;
  suggestions: Restaurant[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: string, name: string) => void;
};

export const AutocompleteMobile: React.FC<AutocompleteMobileProps> = ({
  suggestions,
  fetchSuggestions,
  selectSuggestion,
  loading,
  hasSearchIcon,
  className,
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

  const handleSuggestionClick = (restaurantId: string, showedText: string) => {
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

  return (
    <StyledAutocompleteMobile data-testid="autocomplete" className={className}>
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
            <StyleHeadingText text="Dublin restaurants" />
            <StyleHeadingButton type="button" onClick={handleCloseModal}>
              <i className="material-icons">close</i>
            </StyleHeadingButton>
          </StyleHeading>
          <StyledInput
            type="text"
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
            ref={listboxWrapperRef}
          >
            {loading ? (
              <StyledLoader text={DEFAULT_TEXT_LOADING} />
            ) : (
              <StyledListbox role="listbox">
                {suggestions.map(
                  ({
                    id,
                    imgSrc,
                    title,
                    content,
                    route,
                    asRoute,
                  }: Restaurant) => (
                    <StyledListboxItem key={id} role="option">
                      <Link href={route} as={asRoute}>
                        <Card
                          imgSrc={imgSrc}
                          title={title}
                          content={content}
                          onClick={() => handleSuggestionClick(id, title)}
                          type={CardType.SUGGESTION}
                        />
                      </Link>
                    </StyledListboxItem>
                  ),
                )}
              </StyledListbox>
            )}
          </StyledListboxWrapper>
        </StyledModal>
      </>
    </StyledAutocompleteMobile>
  );
};
