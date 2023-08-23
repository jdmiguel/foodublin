/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { PercentBar } from '../PercentBar';
import { PERCENTS_MOCK, LEGEND_MOCK } from '../__mocks__/percentBar.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: PercentBar', () => {
  const [firstPercent, secondPercent, thirdPercent, fourthPercent] = PERCENTS_MOCK;

  it('should render 25 percent', () => {
    const { container } = render(
      renderWithTheme(<PercentBar percent={firstPercent} legend={LEGEND_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render 50 percent', () => {
    const { container } = render(
      renderWithTheme(<PercentBar percent={secondPercent} legend={LEGEND_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render 75 percent', () => {
    const { container } = render(
      renderWithTheme(<PercentBar percent={thirdPercent} legend={LEGEND_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render 100 percent', () => {
    const { container } = render(
      renderWithTheme(<PercentBar percent={fourthPercent} legend={LEGEND_MOCK} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
