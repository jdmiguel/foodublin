import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../helpers/Theme';

import { DefaultLayout } from '../index';

test('default layout can be passed a child', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <DefaultLayout isExtendedHeader={false} isExtendedFooter={false}>
        <div>
          <h1>Hello World</h1>
        </div>
      </DefaultLayout>
    </ThemeProvider>,
  );
  expect(getByText('Hello World').textContent).toBe('Hello World');
});
