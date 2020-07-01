import React from 'react';
import { render } from '@testing-library/react';

import Header from '../Header';

import { HEADER_TEXT_MOCKS } from '../__mocks__/header.mocks';
import { renderWithTheme } from '../../../helpers/Theme';

const CDN_URL_STATIC_DIRECTORY = 'http://localhost:3003';
const { bgImgSrc, claimTxt } = HEADER_TEXT_MOCKS;

describe('Component: Header', () => {
  it('should render extended Header', () => {
    const { container } = render(
      renderWithTheme(
        <Header
          bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/${bgImgSrc}`}
          claimTxt={claimTxt}
          isExtended={true}
        />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render Header', () => {
    const { container } = render(
      renderWithTheme(
        <Header
          bgImgSrc={`${CDN_URL_STATIC_DIRECTORY}/images/${bgImgSrc}`}
          claimTxt={claimTxt}
          isExtended={false}
        />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
