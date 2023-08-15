import { useState, useCallback } from 'react';
import { AutocompleteMobile } from '../../core/Autocomplete/AutocompleteMobile';
import { Autocomplete } from '../../core/Autocomplete/Autocomplete';
import { Dropdown } from '../../core/Dropdown/Dropdown';
import { Button } from '../../core/Button/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  StyledFinder,
  StyledAutocompleteMobileWrapper,
  StyledAutocompleteWrapper,
  StyledDropdownsWrapper,
  StyledDropdownWrapper,
  StyledSpacer,
  StyledButtonWrapper,
} from './styles';
import { MAX_MOBILE_WIDTH } from '@/store/statics';
import { getFormattedUrlText, debounce } from '@/helpers/utils';
import { getRestaurantsBySearchText } from '@/services/index';
import { Area, Cuisine, RestaurantSuggestion } from '../../pages/types';

type FinderProps = {
  areas: Area[];
  cuisines: Cuisine[];
  onNavigate: (route: string, asRoute: string) => void;
};

export const Finder: React.FC<FinderProps> = ({ areas, cuisines, onNavigate }) => {
  const [suggestions, setSuggestions] = useState<RestaurantSuggestion[]>([]);
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDropdownReset, setIsDropdownReset] = useState(false);
  const [currentLocationPath, setCurrentLocationPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');
  const [onRequestError, setOnRequestError] = useState(false);

  const { windowWidth } = useWindowSize();
  const isMobile = windowWidth < MAX_MOBILE_WIDTH;

  const fetchSuggestions = async (searchText: string) => {
    setIsAutocompleteLoading(true);

    const { restaurants, status } = await getRestaurantsBySearchText(searchText);

    if (status === 200) {
      const formattedRestaurants = restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        route: '/detail/[id]/[name]',
        asRoute: `/detail/${restaurant.id}/${getFormattedUrlText(restaurant.name, true)}`,
      }));

      setSuggestions(formattedRestaurants);
      setOnRequestError(false);
      setIsAutocompleteLoading(false);
    } else {
      setOnRequestError(true);
      setIsAutocompleteLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  const selectSuggestion = (id: string, name: string) => {
    const path = getFormattedUrlText(name, true);
    const route = '/detail/[id]/[name]';
    const asRoute = `/detail/${id}/${path}`;

    setIsButtonLoading(true);
    setIsDropdownReset(true);
    onNavigate(route, asRoute);
  };

  const handleButtonClick = () => {
    if (isButtonLoading) {
      return null;
    }

    const route = '/search/[location]/[cuisine]';
    const asRoute = `/search/${currentLocationPath}/${currentCuisinePath}`;

    setIsButtonLoading(true);
    onNavigate(route, asRoute);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setOnRequestError(false);
  };

  const handleFetchSuggestions = (searchText: string) => {
    setIsAutocompleteLoading(true);
    debouncedFetchSuggestions(searchText);
  };

  return (
    <StyledFinder data-testid="finder">
      {isMobile ? (
        <StyledAutocompleteMobileWrapper>
          <AutocompleteMobile
            suggestions={suggestions || []}
            fetchSuggestions={debouncedFetchSuggestions}
            selectSuggestion={selectSuggestion}
            disabled={isButtonLoading}
            loading={isAutocompleteLoading}
            hasSearchIcon={true}
            onRequestError={onRequestError}
            clearSuggestions={clearSuggestions}
          />
        </StyledAutocompleteMobileWrapper>
      ) : (
        <StyledAutocompleteWrapper>
          <Autocomplete
            suggestions={suggestions || []}
            fetchSuggestions={handleFetchSuggestions}
            selectSuggestion={selectSuggestion}
            disabled={isButtonLoading}
            loading={isAutocompleteLoading}
            hasSearchIcon={true}
            onRequestError={onRequestError}
            clearSuggestions={clearSuggestions}
          />
        </StyledAutocompleteWrapper>
      )}
      <StyledSpacer />
      <StyledDropdownsWrapper>
        <StyledDropdownWrapper>
          <Dropdown
            icon="near_me"
            labelTxt="Select location"
            list={areas}
            disabled={isButtonLoading}
            isReset={isDropdownReset}
            onSelect={(path: string) => setCurrentLocationPath(path)}
            onClear={() => setCurrentLocationPath('dublin')}
          />
        </StyledDropdownWrapper>
        <StyledDropdownWrapper>
          <Dropdown
            icon="restaurant"
            labelTxt="Select cuisine"
            list={cuisines}
            disabled={isButtonLoading}
            isReset={isDropdownReset}
            onSelect={(path: string) => setCurrentCuisinePath(path)}
            onClear={() => setCurrentCuisinePath('any-food')}
          />
        </StyledDropdownWrapper>
      </StyledDropdownsWrapper>
      <StyledButtonWrapper>
        <Button loading={isButtonLoading} onClick={handleButtonClick}>
          Search
        </Button>
      </StyledButtonWrapper>
    </StyledFinder>
  );
};
