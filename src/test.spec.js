import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<Checkout />', () => {
  it('should show a header', () => {
    render(<App />);

    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });
});
