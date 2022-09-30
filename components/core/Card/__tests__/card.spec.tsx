/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../Card';
import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';
import { CardType } from '../../types';

it('should render the standart card', () => {
  const { container } = render(
    renderWithTheme(<Card {...CARD_PROPS_MOCKS} imgSrc={'/images/thumb-1.webp'} />),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render the suggestion card', () => {
  const { container } = render(
    renderWithTheme(
      <Card {...CARD_PROPS_MOCKS} imgSrc={'/images/thumb-1.webp'} type={CardType.SUGGESTION} />,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render the highlight card', () => {
  const { container } = render(
    renderWithTheme(
      <Card {...CARD_PROPS_MOCKS} imgSrc={'/images/cleaver-east.jpg'} type={CardType.HIGHLIGHT} />,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should call callback function on click', async () => {
  const handleClick = jest.fn();

  render(
    renderWithTheme(
      <Card {...CARD_PROPS_MOCKS} imgSrc={'/images/thumb-1.webp'} onClick={handleClick} />,
    ),
  );

  await userEvent.click(screen.getByTestId('card'));

  expect(handleClick).toHaveBeenCalled();
});
