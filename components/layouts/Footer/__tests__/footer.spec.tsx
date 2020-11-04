import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

import reducer from '../../../../store/reducer';

import { Footer } from '../Footer';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Footer', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with veil', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer showVeil={true} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the extended version', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer isExtended={true} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
