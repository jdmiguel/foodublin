/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Filters } from '../Filters';
import { renderWithTheme } from '../../../../helpers/Theme';
import { FILTERS } from '../../../../store/statics';

describe('Component: Filter', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Filters onClick={() => {}} data={FILTERS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should active filter and call callback function on click any filter', async () => {
    const handleClick = jest.fn();

    render(renderWithTheme(<Filters onClick={handleClick} data={FILTERS} />));

    const filters = screen.getByTestId('filters');
    const firstFilterItem = filters.querySelector('button');
    const secondFilterItem = filters.querySelector('button:nth-of-type(2)');
    const thirdFilterItem = filters.querySelector('button:nth-of-type(3)');
    const fourthFilterItem = filters.querySelector('button:nth-of-type(4)');

    // check if background color of filterItems are the expected ones
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');

    if (!firstFilterItem) return;

    await userEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed and callback
    // function has been called
    expect(firstFilterItem).toHaveStyleRule('background-color', '#FDF3E5');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(handleClick).toHaveBeenCalled();

    await userEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed to his defaul
    // value and callback function has been called again
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(handleClick).toHaveBeenCalled();
  });
});
