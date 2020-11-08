import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

import reducer from '../../../../store/reducer';

import { Header } from '../Header';

import { HEADER_TEXT_MOCKS } from '../__mocks__/header.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

const { bgImgSrc, claimTxt } = HEADER_TEXT_MOCKS;

describe('Component: Header', () => {
  it('should render extended Header', () => {
    const mockStore = configureStore();
    const store = mockStore({
      reducer,
    });
    const { container } = render(
      renderWithTheme(
        <Provider store={store}>
          <Header
            bgImgSrc={`/images/${bgImgSrc}`}
            claimTxt={claimTxt}
            isExtended={true}
          />
        </Provider>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render Header', () => {
    const { container } = render(
      renderWithTheme(
        <Header
          bgImgSrc={`/images/${bgImgSrc}`}
          claimTxt={claimTxt}
          isExtended={false}
        />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
