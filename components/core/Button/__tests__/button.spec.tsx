import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Button } from '../Button';

import { BUTTON_MOCK } from '../__mocks__/button.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

it('should render with a simple text', () => {
  const { container } = render(renderWithTheme(<Button>{BUTTON_MOCK.text}</Button>));

  expect(container.firstChild).toMatchSnapshot();
});

it('should render full width', () => {
  const { container } = render(
    renderWithTheme(<Button fullWidth={true}>{BUTTON_MOCK.text}</Button>),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with HTML nodes', () => {
  const { container } = render(
    renderWithTheme(
      <Button>
        <i className="material-icons">{BUTTON_MOCK.icon}</i>
        {BUTTON_MOCK.text}
      </Button>,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with loader', () => {
  const { container } = render(renderWithTheme(<Button loading={true}>{BUTTON_MOCK.text}</Button>));

  expect(container.firstChild).toMatchSnapshot();
});

it('should render as floating', () => {
  const { container } = render(
    renderWithTheme(
      <Button isFloating={true}>
        <i className="material-icons">{BUTTON_MOCK.icon}</i>
        {BUTTON_MOCK.text}
      </Button>,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should call function on click', () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    renderWithTheme(<Button onClick={handleClick}>{BUTTON_MOCK.text}</Button>),
  );

  fireEvent.click(getByText('Default button'));

  expect(handleClick).toHaveBeenCalled();
});
