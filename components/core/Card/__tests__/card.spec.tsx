import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Card }, { CardType } from '../Card';

import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';
import { CDN_URL_STATIC_DIRECTORY } from '../../../../helpers/utils';

it('should render standart card', () => {
  const { container } = render(
    renderWithTheme(
      <Card
        {...CARD_PROPS_MOCKS}
        imgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/thumb-1.webp`}
      />,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render suggestion card', () => {
  const { container } = render(
    renderWithTheme(
      <Card
        {...CARD_PROPS_MOCKS}
        imgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/thumb-1.webp`}
        type={CardType.SUGGESTION}
      />,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render highlight card', () => {
  const { container } = render(
    renderWithTheme(
      <Card
        {...CARD_PROPS_MOCKS}
        imgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/cleaver-east.jpg`}
        type={CardType.HIGHLIGHT}
      />,
    ),
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should call function on click', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(
    renderWithTheme(
      <Card
        {...CARD_PROPS_MOCKS}
        imgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/thumb-1.webp`}
        onClick={handleClick}
      />,
    ),
  );

  fireEvent.click(getByTestId('card'));

  expect(handleClick).toHaveBeenCalled();
});
