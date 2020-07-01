import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import Finder from '../Finder';

import { renderWithTheme } from '../../../helpers/Theme';

describe('Component: Finder', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<Finder />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
