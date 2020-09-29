import React from 'react';
import { render } from '@testing-library/react';

import { Loader }, { LoaderMode } from '../Loader';

import { LOADER_TEXT_MOCKS } from '../__mocks__/loader.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';
import { LoaderType } from '../../../../helpers/types';

describe('Component: Loader', () => {
  it('should render as circle type and dark mode', () => {
    const { container } = render(renderWithTheme(<Loader />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as circle type and light mode', () => {
    const { container } = render(
      renderWithTheme(<Loader mode={LoaderMode.LIGHT} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as circle type, dark mode and with default text', () => {
    const { container } = render(
      renderWithTheme(<Loader text={LOADER_TEXT_MOCKS} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as circle type, light mode and with default text', () => {
    const { container } = render(
      renderWithTheme(
        <Loader text={LOADER_TEXT_MOCKS} mode={LoaderMode.LIGHT} />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as line type', () => {
    const { container } = render(
      renderWithTheme(
        <Loader text={LOADER_TEXT_MOCKS} type={LoaderType.LINE} />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
