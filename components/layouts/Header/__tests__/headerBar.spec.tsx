/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import { HeaderBar } from '../HeaderBar';
import { renderWithTheme } from '../../../../helpers/Theme';
import { HEADER_BAR_MOCKS } from '../__mocks__/header.mocks';

describe('Component: HeaderBar', () => {
  it('should render', () => {
    const { container } = render(renderWithTheme(<HeaderBar {...HEADER_BAR_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click breadcrumb', () => {
    const handleClickBreadcrumb = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <HeaderBar {...HEADER_BAR_MOCKS} onClickBreadcrumb={handleClickBreadcrumb} />,
      ),
    );

    fireEvent.click(getByText('Home'));

    expect(handleClickBreadcrumb).toHaveBeenCalled();
  });

  it('should call function on click favorites', () => {
    const handleClickFavorites = jest.fn();
    const { getByText } = render(
      renderWithTheme(<HeaderBar {...HEADER_BAR_MOCKS} onClickFavorites={handleClickFavorites} />),
    );

    fireEvent.click(getByText('FAVORITES'));

    expect(handleClickFavorites).toHaveBeenCalled();
  });
});
