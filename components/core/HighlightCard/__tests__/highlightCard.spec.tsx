import React from 'react';
import { render } from '@testing-library/react';

import HighlightCard from '../HighlightCard';

import { HIGHLIGHT_CARD_PROPS_MOCKS } from '../__mocks__/highlightCard.mocks';

import { renderWithTheme } from '.././../../../helpers/Theme';

it('should render', () => {
  const { container } = render(
    renderWithTheme(<HighlightCard {...HIGHLIGHT_CARD_PROPS_MOCKS} />),
  );

  expect(container.firstChild).toMatchSnapshot();
});
