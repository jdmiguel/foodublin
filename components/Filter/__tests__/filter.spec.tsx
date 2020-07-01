import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Filter from '../Filter';

import { renderWithTheme } from '../../../helpers/Theme';
import { FILTER_DATA } from '../../../helpers/staticData';

describe('Component: Filter', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Filter onSelect={() => {}} data={FILTER_DATA} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it('should active filter and call function on click any filter', () => {
    const handleSelect = jest.fn();
    const { getByText } = render(
      renderWithTheme(<Filter onSelect={handleSelect} data={FILTER_DATA} />),
    );
    const firstFilterItem = getByText('COST - high to low');

    // check background color of deactivated filterItem
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');

    fireEvent.click(firstFilterItem);

    // check background color of activated filterItem
    expect(firstFilterItem).toHaveStyleRule('background-color', '#FDF3E5');
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
