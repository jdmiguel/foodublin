/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutocompleteMobile } from '../AutocompleteMobile';
import { AUTOCOMPLETE_PROPS_MOCK } from '../__mocks__/autocomplete.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: AutocompleteMobile', () => {
  it('should render correctly', () => {
    const { container } = render(
      renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show / hide modal', async () => {
    render(renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK} />));

    const labelButton = screen.getByTestId('label').querySelector('button');
    const modal = screen.getByTestId('modal');
    const closeButton = modal.querySelector('button');

    // initiality, modal is not shown
    expect(modal).toHaveStyleRule('opacity', '0');
    expect(modal).toHaveStyleRule('visibility', 'hidden');

    // show modal when clicking label button
    await userEvent.click(labelButton);
    expect(modal).toHaveStyleRule('opacity', '1');
    expect(modal).toHaveStyleRule('visibility', 'visible');

    // hide modal when clicking close button
    await userEvent.click(closeButton);
    expect(modal).toHaveStyleRule('opacity', '0');
    expect(modal).toHaveStyleRule('visibility', 'hidden');
  });

  it('should show suggestions list and call callback function when typing 3 characters at least', async () => {
    const handleFetchSuggestion = jest.fn();

    render(
      renderWithTheme(
        <AutocompleteMobile
          {...AUTOCOMPLETE_PROPS_MOCK}
          fetchSuggestions={handleFetchSuggestion}
        />,
      ),
    );

    const listboxWrapper = screen.getByTestId('listbox-wrapper');

    // check if suggestions list is not shown
    expect(listboxWrapper).toHaveStyleRule('opacity', '0');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'hidden');

    // type 3 characters, check if suggestions list is shown and call callback function
    await userEvent.type(screen.getByPlaceholderText('Search for locals...'), 'tre');

    expect(listboxWrapper).toHaveStyleRule('opacity', '1');
    expect(listboxWrapper).toHaveStyleRule('visibility', 'visible');
    expect(handleFetchSuggestion).toHaveBeenCalled();
  });

  it('should hide the suggestions list when cleaning input', async () => {
    render(renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK} />));

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

  it('should call callback function when clicking any suggestion', async () => {
    const handleSelectSuggestion = jest.fn();

    render(
      renderWithTheme(
        <AutocompleteMobile
          {...AUTOCOMPLETE_PROPS_MOCK}
          selectSuggestion={handleSelectSuggestion}
        />,
      ),
    );

    const listboxWrapper = screen.getByTestId('listbox-wrapper');
    const input = screen.getByPlaceholderText('Search for locals...');

    // show suggestions list by typing three characters
    await userEvent.type(input, 'tre');

    // call callback function when clicking any suggestion
    const firstSuggestionLink = listboxWrapper.querySelectorAll('li')[0].querySelector('a');
    await userEvent.click(firstSuggestionLink);
    expect(handleSelectSuggestion).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    const AUTOCOMPLETE_PROPS_MOCK_DISABLED = {
      ...AUTOCOMPLETE_PROPS_MOCK,
      disabled: true,
    };

    const { getByTestId } = render(
      renderWithTheme(<AutocompleteMobile {...AUTOCOMPLETE_PROPS_MOCK_DISABLED} />),
    );
    const autocomplete = getByTestId('autocomplete');
    expect(autocomplete).toHaveStyleRule('pointer-events', 'none');
  });
});
