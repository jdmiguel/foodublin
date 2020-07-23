import React from 'react';
import { render } from '@testing-library/react';

import CustomLink from '../CustomLink';

import { CUSTOM_LINK_MOCK } from '../__mocks__/customLink.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: CustomLink', () => {
  it('should render with a simple text', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.link}>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with HTML nodes', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.link}>
          <i className="material-icons">{CUSTOM_LINK_MOCK.icon}</i>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render external link', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.externalLink}>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
