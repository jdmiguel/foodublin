import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { HeaderBar } from '../HeaderBar';

import { renderWithTheme } from '../../../../helpers/Theme';

const headerBarProps = {
  onClickBack: () => {},
  onClickFavorites: () => {},
};

describe('Component: HeaderBar', () => {
  it('should render', () => {
    const { container } = render(
      renderWithTheme(<HeaderBar {...headerBarProps} />),
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call function on click back', () => {
    const handleClickBack = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <HeaderBar {...headerBarProps} onClickBack={handleClickBack} />,
      ),
    );

    fireEvent.click(getByText('< BACK'));

    expect(handleClickBack).toHaveBeenCalled();
  });

  it('should call function on click favorites', () => {
    const handleClickFavorites = jest.fn();
    const { getByText } = render(
      renderWithTheme(
        <HeaderBar
          {...headerBarProps}
          onClickFavorites={handleClickFavorites}
        />,
      ),
    );

    fireEvent.click(getByText('FAVORITES'));

    expect(handleClickFavorites).toHaveBeenCalled();
  });
});
