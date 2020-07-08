import React from 'react';
import { render } from '@testing-library/react';

import Card from '../Card';

import { CARD_PROPS_MOCKS } from '../__mocks__/card.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';
import { CDN_URL_STATIC_DIRECTORY } from '../../../../helpers/utils';

it('should render', () => {
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
