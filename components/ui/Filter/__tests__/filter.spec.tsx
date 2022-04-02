/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Filter } from '../Filter';
import { renderWithTheme } from '../../../../helpers/Theme';
import { FILTER_DATA } from '../../../../store/statics';

describe('Component: Filter', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<Filter onClick={() => {}} data={FILTER_DATA} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should active filter and call function on click any filter', () => {
    const handleClick = jest.fn();

    const { getByTestId } = render(
      renderWithTheme(<Filter onClick={handleClick} data={FILTER_DATA} />),
    );

    const filter = getByTestId('filter');
    const firstFilterItem = filter.querySelector('button');
    const secondFilterItem = filter.querySelector('button:nth-of-type(2)');
    const thirdFilterItem = filter.querySelector('button:nth-of-type(3)');
    const fourthFilterItem = filter.querySelector('button:nth-of-type(4)');

    // check if background color of filterItems are the expected ones
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');

    fireEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed and callback
    // function has been called
    expect(firstFilterItem).toHaveStyleRule('background-color', '#FDF3E5');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(handleClick).toHaveBeenCalled();

    fireEvent.click(firstFilterItem);

    // check if background color of firstFilterItem has changed to his defaul
    // value and callback function has been called again
    expect(firstFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(secondFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(thirdFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(fourthFilterItem).toHaveStyleRule('background-color', '#F3F3F3');
    expect(handleClick).toHaveBeenCalled();
  });
});
