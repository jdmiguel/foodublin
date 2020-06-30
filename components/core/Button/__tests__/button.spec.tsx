import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../Button';

import { BUTTON_PROPS_MOCKS } from '../__mocks__/button.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

it('should render with text', () => {
  const { container } = render(
    renderWithTheme(<Button {...BUTTON_PROPS_MOCKS} />),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with loader', () => {
  const BUTTON_PROPS_MOCKS_WITH_LOADER = {
    ...BUTTON_PROPS_MOCKS,
    loading: true,
  };
  const { container } = render(
    renderWithTheme(<Button {...BUTTON_PROPS_MOCKS_WITH_LOADER} />),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should call function on click', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    renderWithTheme(<Button {...BUTTON_PROPS_MOCKS} onClick={handleClick} />),
  );

  fireEvent.click(getByText('Search'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
