import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

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
          <Header {...HEADER_MOCKS} isExtended={true} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render collapsed', () => {
    const { container } = render(renderWithTheme(<Header {...HEADER_MOCKS} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click logo', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      renderWithTheme(<Header {...HEADER_MOCKS} onClickLogo={handleClick} />),
    );
    const logoLink = getByTestId('header').querySelector('a:first-of-type');

    fireEvent.click(logoLink);

    expect(handleClick).toHaveBeenCalled();
  });
});
