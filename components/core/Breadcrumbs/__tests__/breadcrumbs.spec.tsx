import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import 'jest-styled-components';

import { Breadcrumbs } from '../Breadcrumbs';

import {
  BREADCRUMBS_DATA_MOCK,
  BREADCRUMBS_CALLBACK_MOCK,
} from '../__mocks__/breadcrumbs.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Breadcrumbs', () => {
  it('should render', () => {
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

  it('should display properly the first two steps', () => {
    const { getByText } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );
    const firstStep = getByText('First step');
    const secondStep = getByText('Second step');

    expect(firstStep).toHaveStyleRule('color', '#FBA52B');
    expect(firstStep).toHaveStyleRule('font-weight', '600');
    expect(secondStep).toHaveStyleRule('color', '#FBA52B');
    expect(secondStep).toHaveStyleRule('font-weight', '600');
  });

  it('should display arrows just after the first two steps', () => {
    const { getByText } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );
    const firstStep = getByText('First step');
    const secondStep = getByText('Second step');
    const thirdStep = getByText('Third step');

    expect(firstStep.parentElement.nextElementSibling).toBeTruthy();
    expect(secondStep.parentElement.nextElementSibling).toBeTruthy();
    expect(thirdStep.parentElement.nextElementSibling).toBeFalsy();
  });

  it('should display the last step properly', () => {
    const { getByText } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_DATA_MOCK}
          onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
        />,
      ),
    );
    const lastStep = getByText('Third step');

    expect(lastStep).toHaveStyleRule('color', '#A7A7A7');
    expect(lastStep).toHaveStyleRule('pointer-events', 'none');
    expect(lastStep).toHaveStyleRule('font-weight', '400');
  });
});

it('should not display arrow after the last step', () => {
  const { getByText } = render(
    renderWithTheme(
      <Breadcrumbs
        breadcrumbsData={BREADCRUMBS_DATA_MOCK}
        onClickBreadcrumb={BREADCRUMBS_CALLBACK_MOCK}
      />,
    ),
  );
  const lastStep = getByText('Third step');

  expect(lastStep.nextElementSibling).toBeNull();
});

it('should call function on click', () => {
  const handleClickBreadcrumb = jest.fn();
  const { getByText } = render(
    renderWithTheme(
      <Breadcrumbs
        breadcrumbsData={BREADCRUMBS_DATA_MOCK}
        onClickBreadcrumb={handleClickBreadcrumb}
      />,
    ),
  );

  fireEvent.click(getByText('First step'));

  expect(handleClickBreadcrumb).toHaveBeenCalled();
});
