import React, { useState, useCallback, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

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

import { setRelatedRestaurants } from '../../../store/redux/actions';

import {
  DUBLIN_ID,
  LOCATIONS,
  CUISINES,
  THUMB_GENERIC_SRC,
  MIN_RESTAURANTS_LIST,
} from '../../../store/statics';
import {
  getFormattedUrlText,
  getCurrentRelatedRestaurants,
} from '../../../helpers/utils';

import { getRestaurants } from '../../../services';

import { EntityType, Restaurant } from '../../pages/types';

type FinderProps = {
  className?: string;
};

export const Finder: React.FC<FinderProps> = ({ className }) => {
  const [suggestions, setSuggestions]: [
    Restaurant[] | undefined,
    Dispatch<any[]>,
  ] = useState();
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [currentLocationPath, setCurrentLocationPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');

  const dispatch = useDispatch();

  const { width } = useWindowMeasurement();
  const isMobile = width < 768;

  const router = useRouter();

  const fetchSuggestions = useCallback(
    async (search: string) => {
      setIsAutocompleteLoading(true);

      const { data, status } = await getRestaurants({
        entity_id: DUBLIN_ID,
        entity_type: EntityType.CITY,
        cuisines: 0,
        q: search,
      });

      if (status === 200) {
        const restaurants = data.restaurants.map((restaurant: any) => ({
          id: restaurant.restaurant.id,
          imgSrc: restaurant.restaurant.thumb || THUMB_GENERIC_SRC,
          title: restaurant.restaurant.name,
          content: restaurant.restaurant.location.locality,
          route: '/detail/[id]/[name]',
          asRoute: `/detail/${restaurant.restaurant.id}/${getFormattedUrlText(
            restaurant.restaurant.name,
            true,
          )}`,
        }));

        setSuggestions(restaurants);
        setIsAutocompleteLoading(false);
      }
    },
    [setIsAutocompleteLoading, setSuggestions],
  );

  const selectSuggestion = useCallback(
    (id: number, name: string) => {
      const path = getFormattedUrlText(name, true);

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
      router.push('/detail/[id]/[name]', `/detail/${id}/${path}`);
    },
    [suggestions],
  );

  const handleButtonClick = () => {
    if (!isButtonLoading) {
      setIsButtonLoading(true);
      router.push(
        '/search/[location]/[cuisine]',
        `/search/${currentLocationPath}/${currentCuisinePath}`,
      );
    }
  };

  return (
    <StyledFinder className={className}>
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
          onSelect={(path: string) => setCurrentLocationPath(path)}
          onClear={() => setCurrentLocationPath('dublin')}
        />
        <StyledDropdown
          icon="restaurant"
          labelTxt="Select any cuisine"
          list={CUISINES}
          disabled={isButtonLoading}
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
