import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { CDN_URL_STATIC_DIRECTORY } from '../../helpers/utils';

import Autocomplete from '../core/Autocomplete/Autocomplete';
import Dropdown from '../core/Dropdown/Dropdown';
import Button from '../core/Button/Button';

import {
  SUGGESTIONS_MOCK,
  EMPTY_SUGGESTIONS_MOCK,
} from '../core/Autocomplete/__mocks__/autocomplete.mocks';
import { LOCATIONS, CUISINES } from '../../helpers/staticData';

type FinderProps = {
  className?: string;
};

const StyledFinder = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 470px) {
    width: 70%;
  }
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
  @media only screen and (min-width: 992px) {
    width: 58rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 1250px) {
    width: 71rem;
  }
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  margin: 0 0 25px 0;
  @media only screen and (min-width: 992px) {
    margin: 0 2% 0 0;
    width: 39%;
  }
  @media only screen and (min-width: 1200px) {
    width: 44%;
  }
`;

const StyledSpacer = styled.span`
  background-color: ${(props) => props.theme.palette.DARK_SOFT};
  width: 100%;
  height: 1px;
  margin: 0 0 25px 0;
  max-width: 550px;
  @media only screen and (min-width: 992px) {
    width: 1px;
    height: 90%;
    margin: 0 2% 0 0;
  }
`;

const StyledDropdownsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 22px;
  &:first-child {
    margin-right: 2%;
  }
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
  @media only screen and (min-width: 992px) {
    width: 47%;
    justify-content: space-around;
    margin-bottom: 0;
    &:first-child {
      margin-right: 0;
    }
  }
`;

const StyledDropdown = styled(Dropdown)`
  width: 100%;
  &:first-of-type {
    margin-right: 2%;
    margin-bottom: 15px;
  }
  @media only screen and (min-width: 768px) {
    max-width: 270px;
    &:first-of-type {
      margin-bottom: 0;
    }
  }
  @media only screen and (min-width: 992px) {
    margin-right: 2%;
    width: 48%;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    width: 300px;
    margin-bottom: 0;
  }
  @media only screen and (min-width: 992px) {
    width: 10%;
  }
`;

const Finder: React.FC<FinderProps> = ({ className }) => {
  const [suggestions, setSuggestions] = useState(EMPTY_SUGGESTIONS_MOCK);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(
    (search: string) => {
      setIsLoading(true);
      setTimeout(() => {
        console.log('search: ', search);
        setSuggestions(SUGGESTIONS_MOCK);
        setIsLoading(false);
      }, 1000);
    },
    [setIsLoading, setSuggestions],
  );

  const selectSuggestion = (id: string) => {
    console.log('id: ', id);
  };

  return (
    <StyledFinder className={className}>
      <StyledAutocomplete
        loaderSrc={`${CDN_URL_STATIC_DIRECTORY}/images/loader.svg`}
        suggestions={suggestions}
        fetchSuggestions={fetchSuggestions}
        selectSuggestion={selectSuggestion}
        loading={isLoading}
        withSearchIcon={true}
      />
      <StyledSpacer />
      <StyledDropdownsWrapper>
        <StyledDropdown
          icon="near_me"
          labelTxt="Select any location"
          list={LOCATIONS}
          onSelect={(id: number) => console.log(id)}
        />
        <StyledDropdown
          icon="restaurant"
          labelTxt="Select any cuisine"
          list={CUISINES}
          onSelect={(id: number) => console.log(id)}
        />
      </StyledDropdownsWrapper>
      <StyledButton
        loading={false}
        loaderSrc={`${CDN_URL_STATIC_DIRECTORY}/images/light_loader.svg`}
      >
        Search
      </StyledButton>
    </StyledFinder>
  );
};

export default Finder;
