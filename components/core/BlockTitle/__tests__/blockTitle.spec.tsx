/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { BlockTitle } from '../BlockTitle';
import { BLOCK_TITLE_TEXT_MOCK } from '../__mocks__/blockTitle.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: BlockTitle', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<BlockTitle text={BLOCK_TITLE_TEXT_MOCK} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
