import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<Checkout />', () => {
  it('should show a header', () => {
    render(<App />);
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is added', () => {
    render(<App />);
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('2.50')).toBeInTheDocument();
  });
});
