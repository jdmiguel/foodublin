import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';

import reducer from '../../../../store/redux/reducer';

import { Header } from '../Header';

import { HEADER_TEXT_MOCKS } from '../__mocks__/header.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Header', () => {
  it('should render extended Header', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Header {...HEADER_TEXT_MOCKS} isExtended={true} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render collapsed Header', () => {
    const { container } = render(
      renderWithTheme(<Header {...HEADER_TEXT_MOCKS} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on logo click', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      renderWithTheme(
        <Header {...HEADER_TEXT_MOCKS} onClickLogo={handleClick} />,
      ),
    );
    const logoLink = getByTestId('header').querySelector('a:first-of-type');

    fireEvent.click(logoLink);

    expect(handleClick).toHaveBeenCalled();
  });
});
