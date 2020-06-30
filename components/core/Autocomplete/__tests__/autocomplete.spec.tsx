import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Autocomplete } from '../Autocomplete';

import { AUTOCOMPLETE_PROPS_MOCK } from '../__mocks__/autocomplete.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Autocomplete', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show suggestions list with a search of less than 3 characters', () => {
    const { getByPlaceholderText, getByTestId } = render(
      renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />),
    );

    fireEvent.change(getByPlaceholderText('Search for locals...'), {
      target: { value: 'tr' },
    });
    expect(
      getByTestId('autocomplete-box-list').getAttribute('class'),
    ).not.toContain('active');
  });

  it('should show suggestions list with a search of 3 characters and call callback function', () => {
    const handleFetchSuggestion = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      renderWithTheme(
        <Autocomplete
          {...AUTOCOMPLETE_PROPS_MOCK}
          fetchSuggestions={handleFetchSuggestion}
        />,
      ),
    );

    fireEvent.change(getByPlaceholderText('Search for locals...'), {
      target: { value: 'tre' },
    });
    expect(
      getByTestId('autocomplete-box-list').getAttribute('class'),
    ).toContain('active');
    expect(handleFetchSuggestion).toHaveBeenCalledTimes(1);
  });

  it('should show/hide suggestions list', async () => {
    const handleSelectSuggestion = jest.fn();
    const { getByPlaceholderText, getByTestId, findByPlaceholderText } = render(
      renderWithTheme(
        <Autocomplete
          {...AUTOCOMPLETE_PROPS_MOCK}
          selectSuggestion={handleSelectSuggestion}
        />,
      ),
    );
    const listbox = getByTestId('autocomplete-box-list');
    const input = getByPlaceholderText('Search for locals...');
    const closeButton = listbox.querySelector('button');

    // show options list by typing three characters
    fireEvent.change(input, { target: { value: 'tre' } });
    expect(listbox.getAttribute('class')).toContain('active');

    // hide options list by activating blur event
    fireEvent.blur(listbox);
    expect(listbox.getAttribute('class')).not.toContain('active');

    // show options list by activating focus event
    fireEvent.focus(input);
    expect(listbox.getAttribute('class')).toContain('active');

    // hide options list by clicking close buton
    fireEvent.click(closeButton);
    expect(listbox.getAttribute('class')).not.toContain('active');

    // show options list by activating focus event
    fireEvent.focus(input);
    expect(listbox.getAttribute('class')).toContain('active');

    // call callback function and hide options list by clicking any suggestion
    const firstSuggestionLink = listbox
      .querySelectorAll('li')[0]
      .querySelector('a');

    fireEvent.click(firstSuggestionLink);
    expect(handleSelectSuggestion).toHaveBeenCalledTimes(1);

    const inputUpdated = await findByPlaceholderText(
      'Start typing to search...',
    );
    const castedInput = inputUpdated as HTMLInputElement;

    expect(castedInput.value).toBe('Manifesto');
    expect(listbox.getAttribute('class')).not.toContain('active');
  });
});
