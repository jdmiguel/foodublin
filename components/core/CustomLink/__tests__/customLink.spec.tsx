/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import { CustomLink } from '../CustomLink';
import { CUSTOM_LINK_MOCK } from '../__mocks__/customLink.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: CustomLink', () => {
  it('should render with a simple text', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.route}>{CUSTOM_LINK_MOCK.text}</CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render disabled', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.route} disabled={true}>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render with HTML nodes', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.route}>
          <i className="material-icons">{CUSTOM_LINK_MOCK.icon}</i>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      renderWithTheme(<CustomLink onClick={handleClick}>{CUSTOM_LINK_MOCK.text}</CustomLink>),
    );

    fireEvent.click(getByText('Default link'));

    expect(handleClick).toHaveBeenCalled();
  });
});
