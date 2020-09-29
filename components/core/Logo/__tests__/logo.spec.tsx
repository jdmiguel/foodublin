import React from 'react';
import { render } from '@testing-library/react';

import { Logo, LogoSize } from '../Logo';

import { LOGO_SRC_MOCK } from '../__mocks__/logo.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Logo', () => {
  it('should render as big version', () => {
    const { container } = render(
      renderWithTheme(<Logo logoSrc={LOGO_SRC_MOCK} size={LogoSize.BIG} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as small version', () => {
    const { container } = render(
      renderWithTheme(<Logo logoSrc={LOGO_SRC_MOCK} size={LogoSize.SMALL} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
