import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import reducer from '../../store/reducer';

import { theme } from '../../helpers/Theme';

import Layout from '../Layout';

test('default layout can be passed a child', () => {
  const mockStore = configureStore();
  const store = mockStore({
    reducer,
  });
  const { getByText } = render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout isExtendedHeader={false} isExtendedFooter={false}>
          <div>
            <h1>Hello World</h1>
          </div>
        </Layout>
      </ThemeProvider>
    </Provider>,
  );
  expect(getByText('Hello World').textContent).toBe('Hello World');
});
