/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '../Dropdown';
import { DROPDOWN_PROPS_MOCK } from '../__mocks__/dropdown.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Dropdown', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should hide the suggestions list on blur', async () => {
    render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />));

    const dropdown = screen.getByTestId('dropdown');
    const dropdownButton = dropdown.querySelector('button');

    // show suggestions list when clicking the dropdown button
    await userEvent.click(dropdownButton);

    const listbox = screen.queryByRole('list');

    expect(listbox).toHaveStyleRule('opacity', '1');
    expect(listbox).toHaveStyleRule('visibility', 'visible');

    // hide options list by activating blur event
    listbox.blur();

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');
  });

  it('should hide the suggestions list when clicking the close button', async () => {
    render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />));

    const dropdown = screen.getByTestId('dropdown');
    const dropdownButton = dropdown.querySelector('button');

    // show suggestions list when clicking the dropdown button
    await userEvent.click(dropdownButton);

    const listbox = screen.queryByRole('list');

    const closeButton = listbox.querySelector('button');
    // hide options list when clicking the close button
    await userEvent.click(closeButton);

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');
  });

  it('should hide the suggestions list when clicking the first suggestion', async () => {
    render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />));

    const dropdown = screen.getByTestId('dropdown');
    const dropdownButton = dropdown.querySelector('button');

    // show suggestions list when clicking the dropdown button
    await userEvent.click(dropdownButton);

    // show options list by clicking dropdown button
    await userEvent.click(dropdownButton);

    const listbox = screen.queryByRole('list');
    const [firstOption] = screen.getAllByRole('listitem');
    const firstOptionText = firstOption.querySelector('p');

    expect(firstOptionText).toHaveStyleRule('font-weight', '400');

    // click first option and hide options list
    await userEvent.click(firstOption);

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');

    // show options list and check if first option is active
    await userEvent.click(dropdownButton);

    expect(firstOptionText).toHaveStyleRule('font-weight', '600');
  });

  it('should change the button name when clicking any suggestion or close button', async () => {
    const DROPDOWN_PROPS_MOCK_CLEARABLE = {
      ...DROPDOWN_PROPS_MOCK,
      clearable: true,
    };

    const handleSelect = jest.fn();

    render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} onSelect={handleSelect} />),
    );
    const dropdown = screen.getByTestId('dropdown');
    const dropdownButton = dropdown.querySelector('button');

    // check if dropdown button name is 'Select any option'
    expect(dropdownButton.querySelector('span').textContent).toBe('Select any option');

    // click the first option of the list, call callback function and check if button name is 'First option'
    await userEvent.click(dropdownButton);
    const [firstOption] = screen.getAllByRole('listitem');
    await userEvent.click(firstOption);

    expect(handleSelect).toHaveBeenCalled();
    expect(dropdownButton.querySelector('span').textContent).toBe('First option');

    // click clear button and check if dropdown button name is 'Select any option'
    await userEvent.click(dropdown.querySelector('button:last-of-type'));

    expect(dropdownButton.querySelector('span').textContent).toBe('Select any option');
  });

  it('should render with the clearable option', async () => {
    const DROPDOWN_PROPS_MOCK_CLEARABLE = {
      ...DROPDOWN_PROPS_MOCK,
      clearable: true,
    };

    render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} />));

    const dropdown = screen.getByTestId('dropdown');
    const dropdownButton = dropdown.querySelector('button');
    // check if close button doesn't exist
    expect(dropdownButton.nextElementSibling).toBeNull();

    // click dropdown button, select first option of the dropdown list and click it
    // check if close button exists
    await userEvent.click(dropdown.querySelector('button'));
    const [firstOption] = screen.getAllByRole('listitem');
    await userEvent.click(firstOption);

    expect(dropdownButton.nextElementSibling).toBeTruthy();
  });

  it('should be disabled', () => {
    const DROPDOWN_PROPS_MOCK_DISABLED = {
      ...DROPDOWN_PROPS_MOCK,
      disabled: true,
    };

    render(renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_DISABLED} />));

    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveStyleRule('pointer-events', 'none');
  });
});
