import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { AutocompleteMobile } from '../AutocompleteMobile';

import { AUTOCOMPLETE_PROPS_MOCK } from '../__mocks__/autocomplete.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: AutocompleteMobile', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show / hide modal', () => {
    const { getByTestId } = render(
      renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK} />),
    );
    const labelButton = getByTestId('label').querySelector('button');
    const modal = getByTestId('modal');
    const closeButton = modal.querySelector('button');

    // initiality, modal has not been showed
    expect(modal).toHaveStyleRule('opacity', '0');
    expect(modal).toHaveStyleRule('visibility', 'hidden');

    // show modal by clicking label button
    fireEvent.click(labelButton);
    expect(modal).toHaveStyleRule('opacity', '1');
    expect(modal).toHaveStyleRule('visibility', 'visible');

    // hide modal by clicking close button
    fireEvent.click(closeButton);
    expect(modal).toHaveStyleRule('opacity', '0');
    expect(modal).toHaveStyleRule('visibility', 'hidden');
  });

  it('should show suggestions list with a search of 3 characters and call callback function', () => {
    const handleFetchSuggestion = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      renderWithTheme(
        <AutocompleteMobile
          {...AUTOCOMPLETE_PROPS_MOCK}
          fetchSuggestions={handleFetchSuggestion}
        />,
      ),
    );
    const listboxWrapper = getByTestId('listbox-wrapper');

    // check if suggestions list is not showed
    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // text 3 characters, check if suggestions list is showed and call callback function
    fireEvent.change(getByPlaceholderText('Search for locals...'), {
      target: { value: 'tre' },
    });

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');
    expect(handleFetchSuggestion).toHaveBeenCalled();
  });

  it('should show/hide suggestions list', () => {
    const handleSelectSuggestion = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      renderWithTheme(
        <AutocompleteMobile
          {...AUTOCOMPLETE_PROPS_MOCK}
          selectSuggestion={handleSelectSuggestion}
        />,
      ),
    );
    const closeButton = getByTestId('modal').querySelector('button');
    const listboxWrapper = getByTestId('listbox-wrapper');
    const input = getByPlaceholderText('Search for locals...');

    // show suggestions list by texting three characters
    fireEvent.change(input, { target: { value: 'tre' } });

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');

    // hide suggestions list by texting two characters
    fireEvent.change(input, { target: { value: 'tr' } });

    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // show suggestions list by texting three characters and hide it by clicking close button
    fireEvent.change(input, { target: { value: 'tre' } });
    fireEvent.click(closeButton);

    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // show suggestions list by texting three characters and call callback function by clicking any suggestion
    fireEvent.change(input, { target: { value: 'tre' } });
    const firstSuggestionLink = listboxWrapper.querySelectorAll('li')[0].querySelector('a');
    fireEvent.click(firstSuggestionLink);

    expect(handleSelectSuggestion).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    const AUTOCOMPLETE_PROPS_MOCK_DISABLED = {
      ...AUTOCOMPLETE_PROPS_MOCK,
      disabled: true,
    };
    const { container } = render(
      renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK_DISABLED} />),
    );
    const autocomplete = container.firstChild as HTMLDivElement;

    expect(autocomplete).toHaveStyleRule('pointer-events', 'none');
  });
});
