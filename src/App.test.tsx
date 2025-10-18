import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MathLib title', () => {
  render(<App />);
  const titleElement = screen.getByText(/MathLib/i);
  expect(titleElement).toBeInTheDocument();
});
