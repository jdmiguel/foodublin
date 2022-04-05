import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AutocompleteMobile } from '../../core/Autocomplete/AutocompleteMobile';
import { Autocomplete } from '../../core/Autocomplete/Autocomplete';
import { Dropdown } from '../../core/Dropdown/Dropdown';
import { Button } from '../../core/Button/Button';
import { useWindowMeasurement } from '../../hooks/useWindowMeasurement';
import {
  StyledFinder,
  StyledAutocompleteMobileWrapper,
  StyledAutocompleteWrapper,
  StyledDropdownsWrapper,
  StyledDropdownWrapper,
  StyledSpacer,
  StyledButtonWrapper,
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
import { getFormattedUrlText, getCurrentRelatedRestaurants } from '@/helpers/utils';
import { getRestaurants } from '@/services/index';
import { EntityType, Restaurant, RawRestaurant } from '../../pages/types';

type FinderProps = {
  className?: string;
  onNavigation: (route: string, asRoute: string) => void;
};

export const Finder: React.FC<FinderProps> = ({ className, onNavigation }) => {
  const [suggestions, setSuggestions] = useState<Restaurant[]>([]);
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDropdownReset, setIsDropdownReset] = useState(false);
  const [currentLocationPath, setCurrentLocationPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');
  const [onRequestError, setOnRequestError] = useState(false);

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
      const formattedRestaurants = rawRestaurants.map((rawRestaurant: RawRestaurant) => ({
        id: rawRestaurant.restaurant.id,
        imgSrc: rawRestaurant.restaurant.thumb || THUMB_GENERIC_SRC,
        title: rawRestaurant.restaurant.name,
        content: rawRestaurant.restaurant.location.locality,
        route: '/detail/[id]/[name]',
        asRoute: `/detail/${rawRestaurant.restaurant.id}/${getFormattedUrlText(
          rawRestaurant.restaurant.name,
          true,
        )}`,
      }));

      setSuggestions(formattedRestaurants);
      setOnRequestError(false);
      setIsAutocompleteLoading(false);
    } else {
      setOnRequestError(true);
      setIsAutocompleteLoading(false);
    }
  };

  const selectSuggestion = (id: number, name: string) => {
    const path = getFormattedUrlText(name, true);
    const route = '/detail/[id]/[name]';
    const asRoute = `/detail/${id}/${path}`;
    if (suggestions.length > MIN_RESTAURANTS_LIST) {
      const currentRelatedRestaurants = getCurrentRelatedRestaurants(suggestions, id);

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

  const clearSuggestions = () => {
    setSuggestions([]);
    setOnRequestError(false);
  };

  return (
    <StyledFinder data-testid="finder" className={className}>
      {isMobile ? (
        <StyledAutocompleteMobileWrapper>
          <AutocompleteMobile
            suggestions={suggestions || []}
            fetchSuggestions={fetchSuggestions}
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
            fetchSuggestions={fetchSuggestions}
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
            list={LOCATIONS}
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
            list={CUISINES}
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
