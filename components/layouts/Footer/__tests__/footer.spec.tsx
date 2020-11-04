import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

import reducer from '../../../../store/reducer';

import { Footer } from '../Footer';

import { renderWithTheme } from '../../../../helpers/Theme';

const footerProps = {
  onClickBreadcrumb: () => {},
  onClickFavorites: () => {},
};

describe('Component: Footer', () => {
  it('should render', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer {...footerProps} />
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
    const updatedFooterProps = { ...footerProps, showVeil: true };
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer {...updatedFooterProps} />
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
    const updatedFooterProps = { ...footerProps, isExtended: true };
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Footer {...updatedFooterProps} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
