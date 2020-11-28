import React from 'react';
import { render } from '@testing-library/react';

import { ReviewCard } from '../ReviewCard';

import { REVIEW_CARD_PROPS_MOCKS } from '../__mocks__/reviewCard.mocks';

import { renderWithTheme } from '@/helpers/Theme';

describe('Component: ReviewCard', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<ReviewCard {...REVIEW_CARD_PROPS_MOCKS} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
