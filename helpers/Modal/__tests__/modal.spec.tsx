import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { DefaultModal } from '../Modal';

afterEach(cleanup);

const SimpleModal = ({ isOpen = false }) => (
  <DefaultModal isOpen={isOpen}>
    <div data-testid="modal">
      <h1>Inside Modal</h1>
    </div>
  </DefaultModal>
);

test('Modal is open and content is available', () => {
  const { getByTestId, getByText } = render(<SimpleModal isOpen={true} />);
  expect(getByTestId('modal')).toBeTruthy();
  expect(getByText('Inside Modal').textContent).toMatch('Inside Modal');
});

test.only('Modal is not open and content is not available', () => {
  const { queryByTestId, queryByText } = render(<SimpleModal />);
  expect(queryByTestId('modal')).toBeNull();
  expect(queryByText('Inside Modal')).toBeNull();
});
