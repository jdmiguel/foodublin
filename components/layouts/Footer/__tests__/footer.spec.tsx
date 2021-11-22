/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Footer } from '../Footer';
import { FOOTER_MOCKS } from '../__mocks__/footer.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Footer', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<Footer {...FOOTER_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with veil', () => {
    const updateFooterProps = { ...FOOTER_MOCKS, showVeil: true };
    const { container } = render(renderWithTheme(<Footer {...updateFooterProps} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render extended', () => {
    const updateFooterProps = { ...FOOTER_MOCKS, isExtended: true };
    const { container } = render(renderWithTheme(<Footer {...updateFooterProps} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
