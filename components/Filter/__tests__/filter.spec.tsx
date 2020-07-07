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
    const { container } = render(
      renderWithTheme(<Filter onSelect={handleSelect} data={FILTER_DATA} />),
    );
    const filter = container.firstChild as HTMLDivElement;
    const firstFilterItem = filter.querySelector('button');
    const secondFilterItem = filter.querySelector('button:nth-of-type(2)');
    const thirdFilterItem = filter.querySelector('button:nth-of-type(3)');
    const fourthFilterItem = filter.querySelector('button:nth-of-type(4)');

    // check background color of first filterItem and rest filterItems
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');

    fireEvent.click(firstFilterItem);

    //  check background color of first filterItem and rest filterItems and call callback
    expect(firstFilterItem).toHaveStyleRule('background-color', '#FDF3E5');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
