import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../Logo';

import { LOGO_TEXT_MOCKS } from '../__mocks__/logo.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

const CDN_URL_STATIC_DIRECTORY = 'http://localhost:3003';
const { logoLightSrc } = LOGO_TEXT_MOCKS;

describe('Component: Logo', () => {
  it('should render as simple H1', () => {
    const { container } = render(
      renderWithTheme(
        <Logo
          logoSrc={`${CDN_URL_STATIC_DIRECTORY}/public/images/${logoLightSrc}`}
        />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
