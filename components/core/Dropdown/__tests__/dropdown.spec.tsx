import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Dropdown from '../Dropdown';

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
    const { getByRole } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK} />),
    );
    const dropdown = getByRole('listbox');
    const dropdownButton = dropdown.querySelector('button');
    const listbox = dropdown.querySelector('div[role="list"]');
    const closeButton = listbox.querySelector('button');
    const firstOption = listbox.querySelector('div[role="listitem"]');

    // initially, options list is hidden
    expect(listbox.getAttribute('class')).not.toContain('active');

    // show options list bu clicking dropdown button
    fireEvent.click(dropdownButton);
    expect(listbox.getAttribute('class')).toContain('active');

    // hide options list by activating blur event
    fireEvent.blur(listbox);
    expect(listbox.getAttribute('class')).not.toContain('active');

    // show options list by clicking dropdown button
    fireEvent.click(dropdownButton);
    expect(listbox.getAttribute('class')).toContain('active');

    // hide options list by clicking close button
    fireEvent.click(closeButton);
    expect(listbox.getAttribute('class')).not.toContain('active');

    // show options list and hide it by clicking the first option
    fireEvent.click(dropdownButton);
    expect(firstOption.getAttribute('class')).not.toContain('active');
    fireEvent.click(firstOption as HTMLDivElement);
    expect(firstOption.getAttribute('class')).toContain('active');
    expect(listbox.getAttribute('class')).not.toContain('active');
  });

  it('should change button name by clicking any option or clear button', () => {
    const DROPDOWN_PROPS_MOCK_CLEARABLE = {
      ...DROPDOWN_PROPS_MOCK,
      clearable: true,
    };
    const handleSelect = jest.fn();
    const { getByRole, getAllByRole } = render(
      renderWithTheme(
        <Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} onSelect={handleSelect} />,
      ),
    );
    const dropdown = getByRole('listbox');
    const dropdownButton = dropdown.querySelector('button');

    // initially, dropdown button name has to be 'Select any option'
    expect(dropdownButton.querySelector('span').textContent).toBe(
      'Select any option',
    );

    // after clicking the first option of the list, callback function has to been called
    // and button name has to be 'First option'
    fireEvent.click(dropdownButton);
    const [firstOption] = getAllByRole('listitem');
    fireEvent.click(firstOption as HTMLDivElement);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(dropdownButton.querySelector('span').textContent).toBe(
      'First option',
    );

    // after clicking clear button, dropdown button name has to be 'Select any option'
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
    const { getByRole, getAllByRole, container } = render(
      renderWithTheme(<Dropdown {...DROPDOWN_PROPS_MOCK_CLEARABLE} />),
    );

    // click dropdown button, select first option of the dropdown list and click it
    fireEvent.click(getByRole('listbox').querySelector('button'));
    const [firstOption] = getAllByRole('listitem');
    fireEvent.click(firstOption as HTMLDivElement);
    expect(container.firstChild).toMatchSnapshot();
  });
});
