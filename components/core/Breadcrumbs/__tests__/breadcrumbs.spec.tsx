/**
 * @jest-environment jsdom
 */

import React from 'react';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumbs } from '../Breadcrumbs';
import { BREADCRUMBS_DATA_MOCK, BREADCRUMBS_CALLBACK_MOCK } from '../__mocks__/breadcrumbs.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    const { container } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display the first two steps', () => {
    render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );

    const firstStep = screen.getByText('First step');
    expect(firstStep).toHaveStyleRule('color', '#FBA52B');
    expect(firstStep).toHaveStyleRule('font-weight', '600');

    const secondStep = screen.getByText('Second step');
    expect(secondStep).toHaveStyleRule('color', '#FBA52B');
    expect(secondStep).toHaveStyleRule('font-weight', '600');
  });

  it('should display the arrow symbols just after the first two breadcrumbs', () => {
    render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );
    const firstStep = screen.getByText('First step');
    expect(firstStep.parentElement?.nextElementSibling).toBeTruthy();

    const secondStep = screen.getByText('Second step');
    expect(secondStep.parentElement?.nextElementSibling).toBeTruthy();

    const thirdStep = screen.getByText('Third step');
    expect(thirdStep.parentElement?.nextElementSibling).toBeFalsy();
  });

  it('should display the last step with the deactivated styles', () => {
    render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );

    const lastStep = screen.getByText('Third step');
    expect(lastStep).toHaveStyleRule('color', '#A7A7A7');
    expect(lastStep).toHaveStyleRule('pointer-events', 'none');
    expect(lastStep).toHaveStyleRule('font-weight', '400');
  });
});

it('should not display the arrow symbol after the last step', () => {
  render(
    renderWithTheme(
      <Breadcrumbs
        breadcrumbsData={BREADCRUMBS_DATA_MOCK}
        onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
      />,
    ),
  );

  const lastStep = screen.getByText('Third step');
  expect(lastStep.nextElementSibling).toBeNull();
});

it('should call callback function when clicking an active breadcrumb', async () => {
  const handleClickBreadcrumb = jest.fn();

  render(
    renderWithTheme(
      <Breadcrumbs
        breadcrumbsData={BREADCRUMBS_DATA_MOCK}
        onClickBreadcrumb={handleClickBreadcrumb}
      />,
    ),
  );

  await userEvent.click(screen.getByText('First step'));
  expect(handleClickBreadcrumb).toHaveBeenCalled();
});
