import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../helpers/Theme';

import { DefaultLayout } from '../index';

afterEach(cleanup);

test('default layout can be passed a child', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <div>
          <h1>Hello World</h1>
        </div>
      </DefaultLayout>
    </ThemeProvider>,
  );
  expect(getByText('Hello World').textContent).toBe('Hello World');
});
