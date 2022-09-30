/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '../Footer';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Footer', () => {
  const props = {
    onClickFavorites: jest.fn(),
  };

  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Footer {...props} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with veil', () => {
    const { container } = render(renderWithTheme(<Footer {...props} showVeil />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
