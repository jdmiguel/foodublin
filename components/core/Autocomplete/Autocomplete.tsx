import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';

import Input from '../Input/Input';

import { THUMB_GENERIC_SRC } from '../../../helpers/staticData';
import { Suggestion } from '../../../helpers/types';

export type AutocompleteProps = {
  className?: string;
  loaderSrc: string;
  hasSearchIcon?: boolean;
  suggestions: Suggestion[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (name: string) => void;
};

enum PlaceholderText {
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

const StyledInput = styled(Input)<{ hasBorderBottomRadius: boolean }>`
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  transition: background-color 0.2s ease-out;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }

  ${({ hasBorderBottomRadius }) =>
    !hasBorderBottomRadius &&
    `border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;`}

  input {
    cursor: pointer;
  }
`;

const StyledListboxWrapper = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transform: translateY(${({ isShowed }) => (isShowed ? '0' : '10px')});
  transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
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
    min-height: 200px;
  }
  img {
    margin-bottom: 8px;
  }
  p {
    font-size: 0.85rem;
  }
`;

const StyledListbox = styled.ul`
  width: 100%;
`;

const StyledListboxItem = styled.li`
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

const ImageCSS = css`
  width: 30px;
  height: 30px;
  border: solid ${(props) => props.theme.palette.LIGHT_MAX} 1px;
  display: inline-block;
  border-radius: 4px;
  -webkit-appearance: button-bevel;
  box-shadow: 1px 2px 5px #888;
`;

const StyledImage = styled(LazyImage)`
  ${ImageCSS}
`;

const StyledGenericThumb = styled.img`
  ${ImageCSS}
`;

const StyledTextWrapper = styled.div`
  margin-left: 12px;
`;

const StyledFirstText = styled.p`
  color: ${(props) => props.theme.palette.DARK_MAX};
  font-size: 1.05rem;
`;

const StyledSecondText = styled.p`
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-size: 0.85rem;
`;

export const Autocomplete: React.FC<AutocompleteProps> = ({
  loaderSrc,
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

  const handleSuggestionClick = (showedText: string) => {
    isSuggestable.current = false;
    clearTimeout(blurDelay.current);
    selectSuggestion(showedText);
    setValue(showedText);
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
        <StyledCloseButton
          type="button"
          onClick={() => {
            setIsListboxFocused(false);
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
          <StyledListbox role="listbox">
            {suggestions.map(
              ({ id, imgSrc, firstText, secondText }: Suggestion) => (
                <StyledListboxItem key={id} role="option">
                  <StyledLink onClick={() => handleSuggestionClick(firstText)}>
                    <StyledImage
                      src={imgSrc}
                      alt={firstText}
                      placeholder={({ imageProps, ref }) => (
                        <div ref={ref} className="LazyImage-Placeholder">
                          <StyledGenericThumb
                            src={THUMB_GENERIC_SRC}
                            alt={imageProps.alt}
                          />
                        </div>
                      )}
                      actual={({ imageProps }) => (
                        <div className="LazyImage-Actual">
                          <img {...imageProps} alt={firstText} />
                        </div>
                      )}
                    />
                    <StyledTextWrapper>
                      <StyledFirstText>{firstText}</StyledFirstText>
                      <StyledSecondText>{secondText}</StyledSecondText>
                    </StyledTextWrapper>
                  </StyledLink>
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
