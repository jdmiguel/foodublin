import React, { useState, useCallback, Dispatch } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { getFormattedUrlText } from '../../helpers/utils';
import { THUMB_GENERIC_SRC } from '../../helpers/staticData';
import { Suggestion } from '../../helpers/types';

import useWindowMeasures from '../hooks/useWindowMeasures';

import { getRestaurantsData } from '../../services';

import AutocompleteMobile from '../core/Autocomplete/AutocompleteMobile';
import Autocomplete from '../core/Autocomplete/Autocomplete';
import Dropdown from '../core/Dropdown/Dropdown';
import Button from '../core/Button/Button';

import {
  DUBLIN_ID,
  DEFAULT_SUGGESTIONS,
  LOCATIONS,
  CUISINES,
} from '../../helpers/staticData';

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

const StyledAutocompleteMobile = styled(AutocompleteMobile)`
  width: 100%;
  margin: 0 0 25px;
`;

const StyledAutocomplete = styled(Autocomplete)`
  margin: 0 0 25px;
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
  const [suggestions, setSuggestions]: [
    Suggestion[],
    Dispatch<Suggestion[]>,
  ] = useState(DEFAULT_SUGGESTIONS);
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [currentLocationPath, setCurrentLocationPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');

  const { width } = useWindowMeasures();
  const isMobile = width < 768;

  const router = useRouter();

  const fetchSuggestions = useCallback(
    async (search: string) => {
      setIsAutocompleteLoading(true);

      const response = await getRestaurantsData(DUBLIN_ID, 'city', 0, search);
      const restaurants = response.restaurants.map((restaurant: any) => ({
        id: restaurant.restaurant.id,
        imgSrc: restaurant.restaurant.thumb || THUMB_GENERIC_SRC,
        firstText: restaurant.restaurant.name,
        secondText: restaurant.restaurant.location.locality,
      }));

      setSuggestions(restaurants);
      setIsAutocompleteLoading(false);
    },
    [setIsAutocompleteLoading, setSuggestions],
  );

  const selectSuggestion = (name: string) => {
    const path = getFormattedUrlText(name, true);
    setIsButtonLoading(true);

    router
      .push('/detail/[name]', `/detail/${path}`)
      .then(() => window.scrollTo(0, 0));
  };

  const handleButtonClick = () => {
    if (!isButtonLoading) {
      setIsButtonLoading(true);
      router
        .push(
          '/search/[location]/[cuisine]',
          `/search/${currentLocationPath}/${currentCuisinePath}`,
        )
        .then(() => window.scrollTo(0, 0));
    }
  };

  return (
    <StyledFinder className={className}>
      {isMobile ? (
        <StyledAutocompleteMobile
          suggestions={suggestions}
          fetchSuggestions={fetchSuggestions}
          selectSuggestion={selectSuggestion}
          loading={isAutocompleteLoading}
          hasSearchIcon={true}
        />
      ) : (
        <StyledAutocomplete
          suggestions={suggestions}
          fetchSuggestions={fetchSuggestions}
          selectSuggestion={selectSuggestion}
          loading={isAutocompleteLoading}
          hasSearchIcon={true}
        />
      )}
      <StyledSpacer />
      <StyledDropdownsWrapper>
        <StyledDropdown
          icon="near_me"
          labelTxt="Select any location"
          list={LOCATIONS}
          onSelect={(path: string) => setCurrentLocationPath(path)}
          onClear={() => setCurrentLocationPath('dublin')}
        />
        <StyledDropdown
          icon="restaurant"
          labelTxt="Select any cuisine"
          list={CUISINES}
          onSelect={(path: string) => setCurrentCuisinePath(path)}
          onClear={() => setCurrentCuisinePath('any-food')}
        />
      </StyledDropdownsWrapper>
      <StyledButton loading={isButtonLoading} onClick={handleButtonClick}>
        Search
      </StyledButton>
    </StyledFinder>
  );
};

export default Finder;
