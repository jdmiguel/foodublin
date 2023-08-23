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
import { getSuggestionsBySearchText } from '@/services/index';
import { Area, Cuisine, Suggestion } from '../../../helpers/types';

type FinderProps = {
  areas: Area[];
  cuisines: Cuisine[];
  onNavigate: (route: string, asRoute: string) => void;
};

export const Finder: React.FC<FinderProps> = ({ areas, cuisines, onNavigate }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isAutocompleteLoading, setIsAutocompleteLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDropdownReset, setIsDropdownReset] = useState(false);
  const [currentAreaPath, setCurrentAreaPath] = useState('dublin');
  const [currentCuisinePath, setCurrentCuisinePath] = useState('any-food');
  const [onRequestError, setOnRequestError] = useState(false);

  const { windowWidth } = useWindowSize();
  const isMobile = windowWidth < MAX_MOBILE_WIDTH;

  const fetchSuggestions = async (searchText: string) => {
    setIsAutocompleteLoading(true);

    const { suggestions, status } = await getSuggestionsBySearchText(searchText);

    if (status === 200) {
      const formattedSuggestions = suggestions.map((suggestion) => ({
        id: suggestion.id,
        name: suggestion.name,
        route: '/details/[id]/[name]',
        asRoute: `/details/${suggestion.id}/${getFormattedUrlText(suggestion.name, true)}`,
      }));

      setSuggestions(formattedSuggestions);
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
    const route = '/details/[id]/[name]';
    const asRoute = `/details/${id}/${path}`;

    setIsButtonLoading(true);
    setIsDropdownReset(true);
    onNavigate(route, asRoute);
  };

  const handleButtonClick = () => {
    if (isButtonLoading) {
      return null;
    }

    const route = '/search/[area]/[cuisine]';
    const asRoute = `/search/${currentAreaPath}/${currentCuisinePath}`;

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
            fetchSuggestions={handleFetchSuggestions}
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
            onSelect={(path: string) => setCurrentAreaPath(path)}
            onClear={() => setCurrentAreaPath('dublin')}
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
            onClear={() => setCurrentCuisinePath('international')}
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
