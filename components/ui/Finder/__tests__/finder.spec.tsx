import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import 'jest-styled-components';

import reducer from '../../../../store/reducer';

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
          <Finder />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
