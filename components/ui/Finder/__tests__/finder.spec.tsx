/**
 * @jest-environment jsdom
 */

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { createTestStore } from '../../../../helpers/utils';
import { Finder } from '../Finder';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Finder', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should render correctly ', () => {
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Finder onNavigation={() => {}} />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call callback function on click', async () => {
    const handleClick = jest.fn();

    render(
      renderWithTheme(
        <Provider store={store}>
          <Finder onNavigation={handleClick} />
        </Provider>,
      ),
    );

    await userEvent.click(screen.getByText('Search'));

    expect(handleClick).toHaveBeenCalled();
  });
});
