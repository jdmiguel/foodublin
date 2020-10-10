import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import 'jest-styled-components';

import { Dropdown } from '../Dropdown';

import { DROPDOWN_PROPS_MOCK } from '../__mocks__/dropdown.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Dropdown', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show/hide options list', () => {
    const { container } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />),
    );
    const dropdown = container.firstChild as HTMLDivElement;
    const dropdownButton = dropdown.querySelector('button');
    const listbox = dropdown.querySelector('div[role="listbox"]');
    const closeButton = listbox.querySelector('button');
    const listboxHeading = closeButton.previousElementSibling.innerHTML;
    const firstOption = listbox.querySelector('div[role="option"]');
    const firstOptionText = firstOption.querySelector('p');

    // check if options list is not showed
    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');

    // show options list by clicking dropdown button
    // check if listboxHeading match with the regarding text
    fireEvent.click(dropdownButton);

    expect(listbox).toHaveStyleRule('opacity', '1');
    expect(listbox).toHaveStyleRule('visibility', 'visible');
    expect(listboxHeading).toContain('Select any option');

    // hide options list by activating blur event
    fireEvent.blur(listbox);

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');

    // show options list by clicking dropdown button
    fireEvent.click(dropdownButton);

    // hide options list by clicking close button
    fireEvent.click(closeButton);

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');

    // show options list and check if first option is not active
    fireEvent.click(dropdownButton);

    expect(firstOptionText).toHaveStyleRule('font-weight', '400');

    // click first option and hide options list
    fireEvent.click(firstOption as HTMLDivElement);

    expect(listbox).toHaveStyleRule('opacity', '0');
    expect(listbox).toHaveStyleRule('visibility', 'hidden');

    // show options list and check if first option is active
    fireEvent.click(dropdownButton);

    expect(firstOptionText).toHaveStyleRule('font-weight', '600');
  });

  it('should change button name by clicking any option or close button', () => {
    const DROPDOWN_PROPS_MOCK_CLEARABLE = {
      ...DROPDOWN_PROPS_MOCK,
      clearable: true,
    };
    const handleSelect = jest.fn();
    const { container, getAllByRole } = render(
      renderWithTheme(
        <Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} onSelect={handleSelect} />,
      ),
    );
    const dropdown = container.firstChild as HTMLDivElement;
    const dropdownButton = dropdown.querySelector('button');

    // check if dropdown button name is 'Select any option'
    expect(dropdownButton.querySelector('span').textContent).toBe(
      'Select any option',
    );

    // click the first option of the list, call callback function and check if button name is 'First option'
    fireEvent.click(dropdownButton);
    const [firstOption] = getAllByRole('option');
    fireEvent.click(firstOption as HTMLDivElement);

    expect(handleSelect).toHaveBeenCalled();
    expect(dropdownButton.querySelector('span').textContent).toBe(
      'First option',
    );

    // click clear button and check if dropdown button name is 'Select any option'
    fireEvent.click(dropdown.querySelector('button:last-of-type'));

    expect(dropdownButton.querySelector('span').textContent).toBe(
      'Select any option',
    );
  });

  it('should render with clearable option', () => {
    const DROPDOWN_PROPS_MOCK_CLEARABLE = {
      ...DROPDOWN_PROPS_MOCK,
      clearable: true,
    };
    const { container, getAllByRole } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} />),
    );
    const dropdown = container.firstChild as HTMLDivElement;
    const labelButton = dropdown.querySelector('div > button');

    // check if close button doesn't exist
    expect(labelButton.nextElementSibling).toBeNull();

    // click dropdown button, select first option of the dropdown list and click it
    // check if close button exists
    fireEvent.click(dropdown.querySelector('button'));
    const [firstOption] = getAllByRole('option');
    fireEvent.click(firstOption as HTMLDivElement);

    expect(labelButton.nextElementSibling).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be disabled', () => {
    const DROPDOWN_PROPS_MOCK_DISABLED = {
      ...DROPDOWN_PROPS_MOCK,
      disabled: true,
    };
    const { container } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_DISABLED} />),
    );
    const dropdown = container.firstChild as HTMLDivElement;

    expect(dropdown).toHaveStyleRule('pointer-events', 'none');
  });
});
