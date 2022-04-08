/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from '../Autocomplete';
import { AUTOCOMPLETE_PROPS_MOCK } from '../__mocks__/autocomplete.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Autocomplete', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show the suggestions list and call callback function when typing 3 characters at least', async () => {
    const handleFetchSuggestion = jest.fn();

    render(
      renderWithTheme(
        <Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} fetchSuggestions={handleFetchSuggestion} />,
      ),
    );

    // check if suggestions list is not showed
    const listboxWrapper = screen.getByTestId('listbox-wrapper');
    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // type 3 characters, check if suggestions list is shown and call callback function
    await userEvent.type(screen.getByPlaceholderText('Search for locals...'), 'tre');
    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');
    expect(handleFetchSuggestion).toHaveBeenCalled();
  });

  it('should hide/show the suggestions list on blur/focus', async () => {
    render(renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />));

    const listboxWrapper = screen.getByTestId('listbox-wrapper');
    const input = screen.getByPlaceholderText('Search for locals...');

    // show suggestions list when typing three characters
    await userEvent.type(input, 'tre');

    // hide suggestions list when activating blur event
    input.blur();
    await waitFor(() => {
      expect(listboxWrapper).toHaveStyleRule('opacity', '0');
      expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');
    });

    // show suggestions list when activating focus event
    input.focus();
    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');
  });

  it('should hide the suggestions list when cleaning input', async () => {
    render(renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} />));

    const listboxWrapper = screen.getByTestId('listbox-wrapper');
    const input = screen.getByPlaceholderText('Search for locals...');

    // show suggestions list when typing three characters
    await userEvent.type(input, 'tre');

    // hide suggestions list when removing characters
    await userEvent.clear(input);
    await waitFor(() => {
      expect(listboxWrapper).toHaveStyleRule('opacity', '0');
      expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');
    });
  });

  it('should hide the suggestions list and call callback function when clicking any suggestion', async () => {
    const handleSelectSuggestion = jest.fn();

    render(
      renderWithTheme(
        <Autocomplete {...AUTOCOMPLETE_PROPS_MOCK} selectSuggestion={handleSelectSuggestion} />,
      ),
    );

    const listboxWrapper = screen.getByTestId('listbox-wrapper');
    const input = screen.getByPlaceholderText('Search for locals...');

    // show suggestions list by typing three characters
    await userEvent.type(input, 'tre');

    // hide suggestions list and call callback function when clicking any suggestion
    const firstSuggestionLink = listboxWrapper.querySelectorAll('li')[0].querySelector('a');
    await userEvent.click(firstSuggestionLink);
    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');
    expect(handleSelectSuggestion).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    const AUTOCOMPLETE_PROPS_MOCK_DISABLED = {
      ...AUTOCOMPLETE_PROPS_MOCK,
      disabled: true,
    };

    render(renderWithTheme(<Autocomplete {...AUTOCOMPLETE_PROPS_MOCK_DISABLED} />));

    const autocomplete = screen.getByTestId('autocomplete');
    expect(autocomplete).toHaveStyleRule('pointer-events', 'none');
  });
});
