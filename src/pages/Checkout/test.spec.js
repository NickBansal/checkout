import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkout from '.';

describe('<Checkout />', () => {
  it('should show a header', () => {
    render(<Checkout />);

    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });
});
