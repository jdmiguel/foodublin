/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import { FooterBar } from '../FooterBar';
import { FOOTER_BAR_MOCKS } from '../__mocks__/footer.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: FooterBar', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<FooterBar {...FOOTER_BAR_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click breadcrumb', () => {
    const handleClickBreadcrumb = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <FooterBar {...FOOTER_BAR_MOCKS} onClickBreadcrumb={handleClickBreadcrumb} />,
      ),
    );

    fireEvent.click(getByText('Home'));

    expect(handleClickBreadcrumb).toHaveBeenCalled();
  });

  it('should call function on click favorites', () => {
    const handleClickFavorites = jest.fn();
    const { getByText } = render(
      renderWithTheme(<FooterBar {...FOOTER_BAR_MOCKS} onClickFavorites={handleClickFavorites} />),
    );

    fireEvent.click(getByText('FAVORITES'));

    expect(handleClickFavorites).toHaveBeenCalled();
  });
});
