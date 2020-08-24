import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

import { renderWithTheme } from '../../../helpers/Theme';

describe('Component: Footer', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<Footer />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with veil', () => {
    const { container } = render(renderWithTheme(<Footer showVeil={true} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the extended version', () => {
    const { container } = render(renderWithTheme(<Footer isExtended={true} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
