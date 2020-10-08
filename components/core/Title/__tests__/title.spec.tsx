import React from 'react';
import { render } from '@testing-library/react';

import { Title } from '../Title';

import { TITLE_TEXT_MOCK } from '../__mocks__/title.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Title', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Title text={TITLE_TEXT_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
