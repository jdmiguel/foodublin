import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import reducer from '../../../../store/redux/reducer';

import { Finder } from '../Finder';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Finder', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Finder onNavigation={() => {}} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on button click', () => {
    const handleClick = jest.fn();
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { getByText } = render(
      renderWithTheme(
        <Provider store={store}>
          <Finder onNavigation={handleClick} />
        </Provider>,
      ),
    );

    fireEvent.click(getByText('Search'));

    expect(handleClick).toHaveBeenCalled();
  });
});
