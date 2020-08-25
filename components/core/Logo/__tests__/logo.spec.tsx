import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../Logo';

import { renderWithTheme } from '../../../../helpers/Theme';

const CDN_URL_STATIC_DIRECTORY = 'http://localhost:3003';

describe('Component: Logo', () => {
  it('should render as simple H1', () => {
    const { container } = render(
      renderWithTheme(
        <Logo logoSrc={`${CDN_URL_STATIC_DIRECTORY}/public/images/logo.svg`} />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
