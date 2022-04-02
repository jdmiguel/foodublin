/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Footer } from '../Footer';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Footer', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<Footer />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with veil', () => {
    const { container } = render(renderWithTheme(<Footer showVeil />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
