import { useState, useEffect, useRef } from 'react';
import { Loader } from '../Loader/Loader';
import { Input } from '../Input/Input';
import { Card } from '../Card/Card';
import { BlockText } from '../BlockText/BlockText';
import { Button } from '../Button/Button';
import {
  StyledAutocomplete,
  StyledInputWrapper,
  StyledListboxWrapper,
  StyledLoaderWrapper,
  StyledListbox,
  StyledNoSuggestionsWrapper,
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
  const [isSuggestable, setIsSuggestable] = useState(true);
  const [value, setValue] = useState('');
  const [focusedPlaceholder, setFocusedPlaceholder] = useState(PlaceholderText.BLURRED);
  const [isListboxFocused, setIsListboxFocused] = useState(false);

  useEffect(() => {
    if (value.length > 2 && isSuggestable) {
      fetchSuggestions(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isSuggestable]);

  const hasBorderBottomRadius = !isListboxFocused || (isListboxFocused && value.length < 3);

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
    setIsSuggestable(false);

    selectSuggestion(restaurantId, showedText);
  };

  const handleClearSuggestion = () => {
    setValue('');
    clearSuggestions();
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0 && value.length > 2) {
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
    <StyledAutocomplete data-testid="autocomplete" className={className} disabled={disabled}>
      <StyledInputWrapper hasBorderBottomRadius={hasBorderBottomRadius}>
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
      <StyledListboxWrapper isShown={isListboxFocused} data-testid="listbox-wrapper">
        {loading ? (
          <StyledLoaderWrapper>
            <Loader className="listbox-loader" text={DEFAULT_TEXT_LOADING} />
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
    </StyledAutocomplete>
  );
};
