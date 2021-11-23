/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { Rating } from '../Rating';
import { RATING_VALUE_MOCK } from '../__mocks__/rating.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Rating', () => {
  it('should render five stars', () => {
    const { container } = render(renderWithTheme(<Rating value={RATING_VALUE_MOCK.five} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render four stars', () => {
    const { container } = render(renderWithTheme(<Rating value={RATING_VALUE_MOCK.four} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render three stars', () => {
    const { container } = render(renderWithTheme(<Rating value={RATING_VALUE_MOCK.three} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render two stars', () => {
    const { container } = render(renderWithTheme(<Rating value={RATING_VALUE_MOCK.two} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render one star', () => {
    const { container } = render(renderWithTheme(<Rating value={RATING_VALUE_MOCK.one} />));

    expect(container.firstChild).toMatchSnapshot();
  });
});
