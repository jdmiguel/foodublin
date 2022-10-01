/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Filter } from '../Filter';
import { renderWithTheme } from '../../../../helpers/Theme';
import { FILTERS } from '../../../../store/statics';

describe('Component: Filter', () => {
  const [firstFilter] = FILTERS;

  const props = {
    onClick: jest.fn(),
  };

  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Filter {...props} data={firstFilter} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call callback function on click', async () => {
    const handleClick = jest.fn();

    render(renderWithTheme(<Filter onClick={handleClick} data={firstFilter} />));

    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalled();
  });
});
