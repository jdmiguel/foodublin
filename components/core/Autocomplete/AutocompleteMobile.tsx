import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { Input } from '../Input/Input';
import { Card }, { CardType } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { BlockTitle } from '../BlockTitle/BlockTitle';

import {
  PlaceholderText,
  DEFAULT_TEXT_LOADING,
} from '../../../helpers/staticData';
import { Restaurant } from '../../../helpers/types';

export type AutocompleteMobileProps = {
  className?: string;
  hasSearchIcon?: boolean;
  suggestions: Restaurant[];
  loading: boolean;
  fetchSuggestions: (search: string) => void;
  selectSuggestion: (id: string, name: string) => void;
};

const StyledAutocompleteMobile = styled.div`
  width: 100%;
  max-width: 550px;
  height: 100%;
`;

const StyledLabel = styled.div`
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
`;

const StyledLabelButton = styled.button`
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
  i {
    font-size: 1.2rem;
    margin-left: 5px;
    margin-right: 10px;
    color: ${({ theme }) => theme.palette.DARK_SOFT};
  }
  span {
    color: ${({ theme }) => theme.palette.DARK_SOFT};
  }
`;

const StyledModal = styled.div<{ isShowed: boolean }>`
  visibility: ${({ isShowed }) => (isShowed ? 'visible' : 'hidden')};
  opacity: ${({ isShowed }) => (isShowed ? '1' : '0')};
  transition: opacity 0.2s ease 0s;
  position: fixed;
  box-sizing: border-box;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 2;
  max-width: 767px;
  top: 0;
  left: 0;
  padding: 20px 20px 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.35);
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
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
    color: ${({ theme }) => theme.palette.DARK_MEDIUM};
  }
`;

const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_SOFT};
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  transition: background-color 0.2s ease-out;
  outline: none;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
  &:focus {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
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
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  z-index: 1;
  top: 150px;
  left: 0;
  padding: 0 10px 173px;
  margin-top: 15px;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  border-radius: 4px;
`;

const StyledLoader = styled(Loader)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
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
  border-bottom: 1px solid ${({ theme }) => theme.palette.LIGHT_MIN};
  list-style: none;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.LIGHT_MEDIUM};
  display: flex;
  transition: background-color 0.2s ease-out;
  outline: none;
  color: ${({ theme }) => theme.palette.DARK_MAX};
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.palette.PRIMARY_LIGHT};
  }
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
