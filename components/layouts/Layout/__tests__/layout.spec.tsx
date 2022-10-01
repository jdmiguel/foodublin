/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../helpers/Theme';
import { createTestStore } from '../../../../helpers/utils';
import { LAYOUT_MOCKS } from '../__mocks__/layout.mocks';
import { Layout } from '../Layout';

describe('Component: Layout', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout {...LAYOUT_MOCKS}>
            <div>
              <h1>Hello World</h1>
            </div>
          </Layout>
        </ThemeProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the extended header', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout {...LAYOUT_MOCKS} isExtendedHeader={true}>
            <div>
              <h1>Hello World</h1>
            </div>
          </Layout>
        </ThemeProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the extended footer', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout {...LAYOUT_MOCKS}>
            <div>
              <h1>Hello World</h1>
            </div>
          </Layout>
        </ThemeProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the footer veil', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout {...LAYOUT_MOCKS} showFooterVeil={true}>
            <div>
              <h1>Hello World</h1>
            </div>
          </Layout>
        </ThemeProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
