/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { FullLoader } from '../FullLoader';
import { Loader } from '../../../core/Loader/Loader';
import { renderWithTheme } from '../../../../helpers/Theme';
import { LoaderType } from '../../../core/types';

describe('Component: Loader', () => {
  it('should render as circle type and be shown', () => {
    const { container } = render(
      renderWithTheme(
        <FullLoader isShown={true}>
          <Loader />
        </FullLoader>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as circle type and be hidden', () => {
    const { container } = render(
      renderWithTheme(
        <FullLoader isShown={false}>
          <Loader />
        </FullLoader>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as line type and be shown', () => {
    const { container } = render(
      renderWithTheme(
        <FullLoader isShown={true} type={LoaderType.LINE}>
          <Loader />
        </FullLoader>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render as line type and be hidden', () => {
    const { container } = render(
      renderWithTheme(
        <FullLoader isShown={false} type={LoaderType.LINE}>
          <Loader />
        </FullLoader>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
