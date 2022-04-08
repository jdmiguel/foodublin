import { render } from '@testing-library/react';
import { renderWithTheme } from '../../../../helpers/Theme';
import { Corner } from '../Corner';

describe('<Corner />', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Corner />));

    expect(container).toMatchSnapshot();
  });
});
