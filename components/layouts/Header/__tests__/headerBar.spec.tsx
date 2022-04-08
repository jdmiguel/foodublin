/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeaderBar } from '../HeaderBar';
import { renderWithTheme } from '../../../../helpers/Theme';
import { HEADER_BAR_MOCKS } from '../__mocks__/header.mocks';

describe('Component: HeaderBar', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<HeaderBar {...HEADER_BAR_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call callback function on click breadcrumb', async () => {
    const handleClickBreadcrumb = jest.fn();

    render(
      renderWithTheme(
        <HeaderBar {...HEADER_BAR_MOCKS} onClickBreadcrumb={handleClickBreadcrumb} />,
      ),
    );

    await userEvent.click(screen.getByText('Home'));

    expect(handleClickBreadcrumb).toHaveBeenCalled();
  });

  it('should call callback function on click favorites', async () => {
    const handleClickFavorites = jest.fn();

    render(
      renderWithTheme(<HeaderBar {...HEADER_BAR_MOCKS} onClickFavorites={handleClickFavorites} />),
    );

    await userEvent.click(screen.getByText('FAVORITES'));

    expect(handleClickFavorites).toHaveBeenCalled();
  });
});
