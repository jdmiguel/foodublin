import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Input, { InputProps } from '../Input';

import { INPUT_PROPS_MOCK } from '../__mocks__/input.mocks';

import { renderWithTheme } from '../../../../helpers/Theme';

describe('Component: Input', () => {
  afterEach(cleanup);

  it('should render including icon and update value', () => {
    const { getByTestId, getByPlaceholderText, getByText, container } = render(
      renderWithTheme(<Input {...(INPUT_PROPS_MOCK as InputProps)} />),
    );

    expect(getByTestId('input-wrapper').getAttribute('class')).toContain(
      'default-className',
    );

    const defaultInput = getByPlaceholderText('default-placeholder');
    expect(defaultInput.getAttribute('type')).toBe('text');
    expect(defaultInput.getAttribute('value')).toBe('');
    expect(defaultInput.getAttribute('disabled')).toBeFalsy();
    expect(defaultInput.getAttribute('readOnly')).toBeFalsy();
    expect(defaultInput.getAttribute('name')).toBe('default-input-name');
    expect(defaultInput.getAttribute('id')).toBe('default-input-id');
    expect(defaultInput.getAttribute('step')).toBe('1');
    expect(defaultInput.getAttribute('autoComplete')).toBe('no');
    expect(defaultInput.getAttribute('maxLength')).toBe('70');
    expect(defaultInput.getAttribute('minLength')).toBe('1');
    fireEvent.change(defaultInput, {
      target: { value: 'fake-value' },
    });
    expect(defaultInput.getAttribute('value')).toBe('fake-value');

    // testing if icon exits
    expect(getByText('search').getAttribute('class')).toBe('material-icons');

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render icon', () => {
    const INPUT_PROPS_MOCK_WITHOUT_ICON = {
      ...INPUT_PROPS_MOCK,
      hasSearchIcon: false,
    };
    const { getByTestId, container } = render(
      renderWithTheme(
        <Input {...(INPUT_PROPS_MOCK_WITHOUT_ICON as InputProps)} />,
      ),
    );

    expect(
      getByTestId('input-wrapper').getElementsByTagName('IMG'),
    ).toHaveLength(0);
    expect(container.firstChild).toMatchSnapshot();
  });
});
