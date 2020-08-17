import React from 'react';
import { render } from '@testing-library/react';

import Loader, { Mode } from '../Loader';

import { LOADER_TEXT_MOCKS } from '../__mocks__/loader.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Loader', () => {
  it('should render as dark mode', () => {
    const { container } = render(renderWithTheme(<Loader mode={Mode.DARK} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as light mode', () => {
    const { container } = render(renderWithTheme(<Loader mode={Mode.LIGHT} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as dark mode and with default text', () => {
    const { container } = render(
      renderWithTheme(<Loader text={LOADER_TEXT_MOCKS} mode={Mode.DARK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as light mode and with default text', () => {
    const { container } = render(
      renderWithTheme(<Loader text={LOADER_TEXT_MOCKS} mode={Mode.LIGHT} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
