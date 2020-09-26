import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Filter from '../Filter';

import { renderWithTheme } from '../../../../helpers/Theme';
import { FILTER_DATA } from '../../../../helpers/staticData';

describe('Component: Filter', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Filter onClick={() => {}} data={FILTER_DATA} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it('should active filter and call function on click any filter', () => {
    const handleClick = jest.fn();
    const { container } = render(
      renderWithTheme(<Filter onClick={handleClick} data={FILTER_DATA} />),
    );
    const filter = container.firstChild as HTMLDivElement;
    const firstFilterItem = filter.querySelector('button');
    const secondFilterItem = filter.querySelector('button:nth-of-type(2)');
    const thirdFilterItem = filter.querySelector('button:nth-of-type(3)');
    const fourthFilterItem = filter.querySelector('button:nth-of-type(4)');

    // check if background color of filterItems are the expected ones
    expect(firstFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#E5EAED');

    fireEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed and callback
    // function has been called
    expect(firstFilterItem).toHaveStyleRule('background-color', '#FDF3E5');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(handleClick).toHaveBeenCalled();

    fireEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed to his defaul
    // value and callback function has been called again
    expect(firstFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#E5EAED');
    expect(handleClick).toHaveBeenCalled();
  });
});
