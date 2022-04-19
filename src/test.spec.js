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
    expect(screen.getByText('Face Masks (1)')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[0]);
    expect(screen.getByText('Face Masks (2)')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByText('Face Masks (1)')).toBeInTheDocument();
  });

  it('should update the total of toilet paper when a toilet paper is added', () => {
    render(<App />);
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getByText('Toilet Paper (1)')).toBeInTheDocument();
  });

  it('should update the total of face masks when a face mask is subtracted', () => {
    render(<App />);
    userEvent.dblClick(screen.getAllByRole('button')[2]);
    expect(screen.getByText('Toilet Paper (2)')).toBeInTheDocument();
    userEvent.click(screen.getAllByRole('button')[3]);
    expect(screen.getByText('Toilet Paper (1)')).toBeInTheDocument();
  });

  it('should not allow the user to go below zero and it should disable to button', () => {
    render(<App />);
    expect(screen.getAllByRole('button')[1]).toBeDisabled();
    expect(screen.getAllByRole('button')[3]).toBeDisabled();
    userEvent.click(screen.getAllByRole('button')[0]);
    userEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getAllByRole('button')[1]).not.toBeDisabled();
    expect(screen.getAllByRole('button')[3]).not.toBeDisabled();
  });

  it('should increase the total price when a face mask is added', () => {
    render(<App />);
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('Total: £2.50', { exact: false })).toBeInTheDocument();
  });
});
