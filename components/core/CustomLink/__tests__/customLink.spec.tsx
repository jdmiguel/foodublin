/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should render with disabled styles', () => {
    const { container } = render(
      renderWithTheme(
        <CustomLink route={CUSTOM_LINK_MOCK.route} disabled={true}>
          {CUSTOM_LINK_MOCK.text}
        </CustomLink>,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call callback function on click', async () => {
    const handleClick = jest.fn();

    render(renderWithTheme(<CustomLink onClick={handleClick}>{CUSTOM_LINK_MOCK.text}</CustomLink>));

    await userEvent.click(screen.getByText('Default link'));
    expect(handleClick).toHaveBeenCalled();
  });
});
