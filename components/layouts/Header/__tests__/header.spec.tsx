/**
 * @jest-environment jsdom
 */

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTestStore } from '../../../../helpers/utils';
import { Header } from '../Header';
import { HEADER_MOCKS } from '../__mocks__/header.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Header', () => {
  it('should render extended', () => {
    const store = createTestStore();

    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Header {...HEADER_MOCKS} isExtended />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render collapsed', () => {
    const { container } = render(renderWithTheme(<Header {...HEADER_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call callback function when clicking the logo', async () => {
    const handleClickLogo = jest.fn();

    render(renderWithTheme(<Header {...HEADER_MOCKS} onClickLogo={handleClickLogo} />));
    const logoLink = screen.getByTestId('header').querySelector('a:first-of-type');

    await userEvent.click(logoLink);

    expect(handleClickLogo).toHaveBeenCalled();
  });
});
