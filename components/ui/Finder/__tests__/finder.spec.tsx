/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { createTestStore } from '../../../../helpers/utils';

import { Finder } from '../Finder';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Finder', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should render', () => {
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
