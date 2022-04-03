/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import { Filter } from '../Filter';
import { renderWithTheme } from '../../../../helpers/Theme';
import { FILTERS } from '../../../../store/statics';

describe('Component: Filter', () => {
  const [firstFilter] = FILTERS;

  it('should render', () => {
    const { container } = render(renderWithTheme(<Filter onClick={() => {}} data={firstFilter} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click any filter', () => {
    const handleClick = jest.fn();

    const { getByRole } = render(
      renderWithTheme(<Filter onClick={handleClick} data={firstFilter} />),
    );

    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
