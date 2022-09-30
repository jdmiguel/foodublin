/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, InputProps } from '../Input';
import { INPUT_PROPS_MOCK } from '../__mocks__/input.mocks';
import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Input', () => {
  it('should render correctly', () => {
    const { container } = render(renderWithTheme(<Input {...(INPUT_PROPS_MOCK as InputProps)} />));

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should set the correct attributes', () => {
    render(renderWithTheme(<Input {...(INPUT_PROPS_MOCK as InputProps)} />));

    expect(screen.getByTestId('input-wrapper').getAttribute('class')).toContain(
      'default-className',
    );

    const input = screen.getByPlaceholderText('Default placeholder');
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('value')).toBe('');
    expect(input.getAttribute('disabled')).toBeFalsy();
    expect(input.getAttribute('readOnly')).toBeFalsy();
    expect(input.getAttribute('name')).toBe('default-input-name');
    expect(input.getAttribute('id')).toBe('default-input-id');
    expect(input.getAttribute('step')).toBe('1');
    expect(input.getAttribute('autoComplete')).toBe('no');
    expect(input.getAttribute('maxLength')).toBe('70');
    expect(input.getAttribute('minLength')).toBe('1');
  });

  it('should set the correct value and call callback function when typing', async () => {
    const handleChange = jest.fn();

    render(
      renderWithTheme(<Input {...(INPUT_PROPS_MOCK as InputProps)} onChange={handleChange} />),
    );

    const input = screen.getByPlaceholderText('Default placeholder');
    await userEvent.type(input, 'tre');

    expect(input.getAttribute('value')).toBe('tre');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should not render icon', () => {
    const INPUT_PROPS_MOCK_WITHOUT_ICON = {
      ...INPUT_PROPS_MOCK,
      hasSearchIcon: false,
    };
    const { container } = render(
      renderWithTheme(<Input {...(INPUT_PROPS_MOCK_WITHOUT_ICON as InputProps)} />),
    );

    expect(screen.getByTestId('input-wrapper').getElementsByTagName('IMG')).toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
  });
});
