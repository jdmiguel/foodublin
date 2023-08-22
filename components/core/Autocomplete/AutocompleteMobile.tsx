import { useState, useEffect, useRef } from 'react';
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
import { Suggestion } from '../../../helpers/types';

export type AutocompleteMobileProps = {
  hasSearchIcon?: boolean;
  suggestions: Suggestion[];
  loading: boolean;
  className?: string;
  disabled: boolean;
  onRequestError: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: string, name: string) => void;
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
  const [isSuggestable, setIsSuggestable] = useState(true);
  const [value, setValue] = useState('');
  const [focusedPlaceholder, setFocusedPlaceholder] = useState(PlaceholderText.BLURRED);
  const [labelTextShowed, setLabelTextShowed] = useState(PlaceholderText.BLURRED as string);
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
    if (value.length > 2 && isSuggestable) {
      fetchSuggestions(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isSuggestable]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setIsListboxFocused(currentValue.length > 2);
    setValue(currentValue);
  };

  const handleInputFocus = () => {
    if (!value) {
      setFocusedPlaceholder(PlaceholderText.FOCUSED);
      return;
    }

    if (value.length > 2) {
      setIsListboxFocused(true);
    }
  };

  const handleInputBlur = () => {
    if (!value) {
      setFocusedPlaceholder(PlaceholderText.BLURRED);
    }
  };

  const handleSuggestionClick = (restaurantId: string, showedText: string) => {
    setValue(showedText);
    setLabelTextShowed(showedText);
    setIsModalShowed(false);
    setIsSuggestable(false);
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

    return suggestions.map(({ id, name }: Suggestion) => (
      <StyledListboxItem key={id} role="option">
        <Card
          imgSrc="/images/generic-venue.svg"
          title={name}
          onClick={() => handleSuggestionClick(id, name)}
          type={CardType.SUGGESTION}
        />
      </StyledListboxItem>
    ));
  };

  return (
    <StyledAutocompleteMobile data-testid="autocomplete" className={className} disabled={disabled}>
      <StyledLabel data-testid="label">
        <StyledLabelButton type="button" onClick={() => setIsModalShowed(true)}>
          <i data-testid={'label-icon'} className="material-icons">
            search
          </i>
          <span>{labelTextShowed}</span>
        </StyledLabelButton>
      </StyledLabel>
      <StyledModal isShown={isModalShowed} data-testid="modal">
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
          isShown={isListboxFocused}
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
    </StyledAutocompleteMobile>
  );
};
