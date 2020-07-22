import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import 'jest-styled-components';

import Breadcrumbs from '../Breadcrumbs';

import { BREADCRUMBS_MOCK } from '../__mocks__/breadcrumbs.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Breadcrumbs', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<Breadcrumbs breadcrumbsData={BREADCRUMBS_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should display properly the first two steps and call function on click them', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_MOCK}
          onClick={handleClick}
        />,
      ),
    );
    const firstStep = getByText('First step');
    const secondStep = getByText('Second step');

    expect(firstStep).toHaveStyleRule('color', '#FBA52B');
    expect(secondStep).toHaveStyleRule('color', '#FBA52B');

    fireEvent.click(firstStep);

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith('/first-link');

    fireEvent.click(secondStep);

    expect(handleClick).toHaveBeenCalled();
    expect(handleClick).toHaveBeenCalledWith('/second-link');
  });

  it('should display arrows after the first two steps', () => {
    const { getByText } = render(
      renderWithTheme(<Breadcrumbs breadcrumbsData={BREADCRUMBS_MOCK} />),
    );
    const firstStep = getByText('First step');
    const secondStep = getByText('Second step');

    expect(firstStep.nextElementSibling).toBeTruthy();
    expect(secondStep.nextElementSibling).toBeTruthy();
  });

  it('should display properly the last step and do not call function on click it', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <Breadcrumbs
          breadcrumbsData={BREADCRUMBS_MOCK}
          onClick={handleClick}
        />,
      ),
    );
    const lastStep = getByText('Third step');

    expect(lastStep).toHaveStyleRule('color', '#A7A7A7');
    expect(lastStep).toHaveStyleRule('pointer-events', 'none');

    fireEvent.click(lastStep);

    expect(handleClick).not.toHaveBeenCalled();
  });
});

it('should not display arrow after the last step', () => {
  const { getByText } = render(
    renderWithTheme(<Breadcrumbs breadcrumbsData={BREADCRUMBS_MOCK} />),
  );
  const lastStep = getByText('Third step');

  expect(lastStep.nextElementSibling).toBeNull();
});
