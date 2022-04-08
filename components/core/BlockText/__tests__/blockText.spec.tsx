/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BlockText } from '../BlockText';
import { BLOCK_TEXT_MOCK } from '../__mocks__/blockText.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: BlockText', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<BlockText text={BLOCK_TEXT_MOCK} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
