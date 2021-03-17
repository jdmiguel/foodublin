import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWindowMeasurement } from '../../hooks/useWindowMeasurement';

import {
  StyledFinder,
  StyledAutocompleteMobile,
  StyledAutocomplete,
  StyledDropdownsWrapper,
  StyledDropdown,
  StyledSpacer,
  StyledButton,
} from './styles';

import { setRelatedRestaurants } from '@/store/redux/actions';

import {
  DUBLIN_ID,
  LOCATIONS,
  CUISINES,
  THUMB_GENERIC_SRC,
  MIN_RESTAURANTS_LIST,
  MAX_MOBILE_WIDTH,
} from '@/store/statics';
import {
  getFormattedUrlText,
  getCurrentRelatedRestaurants,
} from '@/helpers/utils';

import { getRestaurants } from '@/services/index';

import { EntityType, Restaurant, RawRestaurant } from '../../pages/types';

type FinderProps = {
  className?: string;
  onNavigation: (route: string, asRoute: string) => void;
};

export const Finder: React.FC<FinderProps> = ({ className, onNavigation }) => {
  const [suggestions, setSuggestions] = useState<Restaurant[]>();
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDropdownReset, setIsDropdownReset] = useState(false);
  const [currentLocationPath, setCurrentLocationPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');

  const dispatch = useDispatch();

  const { width } = useWindowMeasurement();
  const isMobile = width < MAX_MOBILE_WIDTH;

  const fetchSuggestions = async (search: string) => {
    setIsAutocompleteLoading(true);

    const { rawRestaurants, status } = await getRestaurants({
      entity_id: DUBLIN_ID,
      entity_type: EntityType.CITY,
      cuisines: null,
      q: search,
    });

    if (status === 200) {
      const formattedRestaurants = rawRestaurants.map(
        (rawRestaurant: RawRestaurant) => ({
          id: rawRestaurant.restaurant.id,
          imgSrc: rawRestaurant.restaurant.thumb || THUMB_GENERIC_SRC,
          title: rawRestaurant.restaurant.name,
          content: rawRestaurant.restaurant.location.locality,
          route: '/detail/[id]/[name]',
          asRoute: `/detail/${
            rawRestaurant.restaurant.id
          }/${getFormattedUrlText(rawRestaurant.restaurant.name, true)}`,
        }),
      );

      setSuggestions(formattedRestaurants);
      setIsAutocompleteLoading(false);
    }
  };

  const selectSuggestion = (id: number, name: string) => {
    const path = getFormattedUrlText(name, true);
    const route = '/detail/[id]/[name]';
    const asRoute = `/detail/${id}/${path}`;

    if (
      Array.isArray(suggestions) &&
      suggestions.length > MIN_RESTAURANTS_LIST
    ) {
      const currentRelatedRestaurants = getCurrentRelatedRestaurants(
        suggestions,
        id,
      );

      dispatch(setRelatedRestaurants(currentRelatedRestaurants));
    }

    setIsButtonLoading(true);
    setIsDropdownReset(true);
    onNavigation(route, asRoute);
  };

  const handleButtonClick = () => {
    if (isButtonLoading) {
      return null;
    }

    const route = '/search/[location]/[cuisine]';
    const asRoute = `/search/${currentLocationPath}/${currentCuisinePath}`;

    setIsButtonLoading(true);
    onNavigation(route, asRoute);
  };

  return (
    <StyledFinder data-testid="finder" className={className}>
      {isMobile ? (
        <StyledAutocompleteMobile
          suggestions={suggestions || []}
          fetchSuggestions={fetchSuggestions}
          selectSuggestion={selectSuggestion}
          disabled={isButtonLoading}
          loading={isAutocompleteLoading}
          hasSearchIcon={true}
        />
      ) : (
        <StyledAutocomplete
          suggestions={suggestions || []}
          fetchSuggestions={fetchSuggestions}
          selectSuggestion={selectSuggestion}
          disabled={isButtonLoading}
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
          disabled={isButtonLoading}
          isReset={isDropdownReset}
          onSelect={(path: string) => setCurrentLocationPath(path)}
          onClear={() => setCurrentLocationPath('dublin')}
        />
        <StyledDropdown
          icon="restaurant"
          labelTxt="Select any cuisine"
          list={CUISINES}
          disabled={isButtonLoading}
          isReset={isDropdownReset}
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
