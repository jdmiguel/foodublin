/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Review } from '../Review';
import { REVIEW_CARD_PROPS_MOCKS } from '../__mocks__/reviewCard.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Review {...REVIEW_CARD_PROPS_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
