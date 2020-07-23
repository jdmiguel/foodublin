import React from 'react';
import { render } from '@testing-library/react';

import CustomLink from '../CustomLink';

import { CUSTOM_LINK } from '../__mocks__/customLink.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: CustomLink', () => {
  it('should render with a simple text', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK.link}>{CUSTOM_LINK.text}</CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render with a React Node', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK.link}>
          <i className="material-icons">{CUSTOM_LINK.icon}</i>
          {CUSTOM_LINK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  it('should render external link', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK.externalLink}>
          {CUSTOM_LINK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
