/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { BUTTON_MOCK } from '../__mocks__/button.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

it('should render with a simple text', () => {
  const { container } = render(renderWithTheme(<Button>{BUTTON_MOCK.text}</Button>));

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with full width style', () => {
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

it('should render with floating styles', () => {
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

it('should call callback function on click', async () => {
  const handleClick = jest.fn();

  render(renderWithTheme(<Button onClick={handleClick}>{BUTTON_MOCK.text}</Button>));

  await userEvent.click(screen.getByText('Default button'));

  expect(handleClick).toHaveBeenCalled();
});
