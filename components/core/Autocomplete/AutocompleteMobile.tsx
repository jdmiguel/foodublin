import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { LazyImage } from 'react-lazy-images';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Input from '../Input/Input';
import Loader, { Mode } from '../Loader/Loader';
import BlockTitle from '../BlockTitle/BlockTitle';

import {
  PlaceholderText,
  THUMB_GENERIC_SRC,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Suggestion } from '../../../helpers/types';

export type AutocompleteMobileProps = {
  className?: string;
  hasSearchIcon?: boolean;
  suggestions: Suggestion[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (name: string) => void;
};

const StyledAutocompleteMobile = styled.div`
  width: 100%;
  max-width: 550px;
  height: 100%;
`;

const StyledLabel = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
`;

const StyledLabelButton = styled.button`
  width: 100%;
  height: 55px;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
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
    color: ${(props) => props.theme.palette.DARK_SOFT};
  }
  span {
    color: ${(props) => props.theme.palette.DARK_SOFT};
  }
`;

const StyledModal = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transition: opacity 0.2s ease 0s;
  position: fixed;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.LIGHT_MAX};
  z-index: 2;
  max-width: 767px;
  top: 0;
  left: 0;
  padding: 20px 20px 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${(props) => props.theme.palette.LIGHT_MAX};
  border-radius: 0 0 4px 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: 0;
`;

const StyleHeading = styled.div`
  margin: 15px 0 25px;
  display: flex;
  justify-content: space-between;
`;

const StyleHeadingText = styled(BlockTitle)`
  font-size: 1.3rem;
`;

const StyleHeadingButton = styled.button`
  display: block;
  transition: opacity 0.2s ease-out;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  i {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.palette.DARK_MEDIUM};
  }
`;

const StyledInput = styled(Input)`
  border: 1px solid ${(props) => props.theme.palette.LIGHT_SOFT};
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  transition: background-color 0.2s ease-out;
  outline: none;
  &:hover {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${(props) => props.theme.palette.PRIMARY_LIGHT};
  }

  input {
    cursor: pointer;
  }
`;

const StyledListboxWrapper = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transition: opacity 0.2s ease 0s;
  position: absolute;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.LIGHT_MAX};
  z-index: 1;
  top: 150px;
  left: 0;
  padding: 0 10px 173px;
  margin-top: 15px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  border: 1px solid ${(props) => props.theme.palette.LIGHT_MAX};
  border-radius: 4px;
`;

const StyledLoader = styled(Loader)`
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
`;

const StyledListbox = styled.ul`
  width: 100%;
`;

const StyledListboxItem = styled.li`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.LIGHT_MIN};
  list-style: none;
  padding: 11px;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.LIGHT_MAX};
  display: flex;
  transition: background-color 0.2s ease-out;
  outline: none;
  color: ${(props) => props.theme.palette.DARK_MAX};
  -webkit-tap-highlight-color: transparent;
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
  text-align: left;
  color: ${(props) => props.theme.palette.DARK_MAX};
  font-size: 1.05rem;
`;

const StyledSecondText = styled.p`
  text-align: left;
  color: ${(props) => props.theme.palette.DARK_SOFT};
  font-size: 0.85rem;
`;

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

  const handleSuggestionClick = (showedText: string) => {
    setValue(showedText);
    setLabelTextShowed(showedText);
    setIsModalShowed(false);
    isSuggestable.current = false;
    selectSuggestion(showedText);
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
              <StyledLoader text={DEFAULT_TEXT_LOADING} mode={Mode.DARK} />
            ) : (
              <StyledListbox role="listbox">
                {suggestions.map(
                  ({ id, imgSrc, firstText, secondText }: Suggestion) => (
                    <StyledListboxItem
                      key={id}
                      role="option"
                      onClick={() => handleSuggestionClick(firstText)}
                    >
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

export default AutocompleteMobile;
